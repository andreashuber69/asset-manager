// Copyright (C) 2018-2019 Andreas Huber Dönni
//
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
// License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with this program. If not, see
// <http://www.gnu.org/licenses/>.

import { Asset, IParent } from "./Asset";
import { AssetBundle } from "./AssetBundle";
import { AssetCollectionUtility } from "./AssetCollectionUtility";
import { AssetGroup } from "./AssetGroup";
import { Ordering } from "./Ordering";
import { TaskQueue } from "./TaskQueue";
import { GroupBy } from "./validation/schemas/GroupBy.schema";
import { ISort } from "./validation/schemas/ISort.schema";

interface INotifiableParent extends IParent {
    notifyChanged(): void;
}

interface IAssetCollectionParameters {
    parent: INotifiableParent;
    bundles: AssetBundle[];
    groupBy?: GroupBy;
    sort?: ISort;
}

export class AssetCollection {
    public readonly ordering: Ordering;

    /** Provides the grouped assets. */
    public get grouped() {
        const result = new Array<Asset>();

        for (const group of this.groups) {
            result.push(group);

            if (group.isExpanded) {
                result.push(...group.assets);
            }
        }

        return result;
    }

    public get isEmpty() {
        return this.bundles.length === 0;
    }

    /** Provides the sum of all asset total values. */
    public get grandTotalValue() {
        return this.groups.reduce<number | undefined>(
            (s, a) => ((s === undefined) || (a.totalValue === undefined) ? undefined : s + a.totalValue),
            0,
        );
    }

    public constructor(params: IAssetCollectionParameters) {
        this.ordering = new Ordering({
            onGroupChanged: () => this.onGroupChanged(),
            onSortChanged: () => AssetCollectionUtility.sort(this.groups, this.ordering.sort),
            groupBy: params.groupBy,
            sort: params.sort,
        });

        this.parent = params.parent;
        this.bundles = params.bundles;
        this.update(...this.bundles);
    }

    /** Bundles and adds `asset` to the list of asset bundles. */
    public add(asset: Asset) {
        const bundle = asset.bundle();
        this.bundles.push(bundle);
        this.update(bundle);
        this.parent.notifyChanged();
    }

    /** Deletes `asset`. */
    public delete(asset: Asset) {
        const index = this.bundles.findIndex((b) => b.assets.includes(asset));

        if (index >= 0) {
            const bundle = this.bundles[index];
            bundle.deleteAsset(asset);

            if (bundle.assets.length === 0) {
                this.bundles.splice(index, 1);
            }

            this.update();
            this.parent.notifyChanged();
        }
    }

    /** Replaces the bundle containing `oldAsset` with a bundle containing `newAsset`. */
    public replace(oldAsset: Asset, newAsset: Asset) {
        const index = this.bundles.findIndex((b) => b.assets.includes(oldAsset));

        if (index >= 0) {
            const bundle = newAsset.bundle();
            // Apparently, Vue cannot detect the obvious way of replacing (this.bundles[index] = bundle):
            // https://codingexplained.com/coding/front-end/vue-js/array-change-detection
            this.bundles.splice(index, 1, bundle);
            this.update(bundle);
            this.parent.notifyChanged();
        }
    }

    public async idle() {
        return this.taskQueue.idle();
    }

    /** @internal */
    public toJSON() {
        return this.bundles.map((bundle) => bundle.toJSON());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static async queryBundleData(bundle: AssetBundle, id: number) {
        await bundle.queryData();

        return id;
    }

    private readonly taskQueue = new TaskQueue();
    private readonly groups = new Array<AssetGroup>();
    private readonly bundles: AssetBundle[];
    private readonly parent: INotifiableParent;

    private onGroupChanged() {
        this.groups.length = 0;
        this.update();
    }

    private update(...newBundles: readonly AssetBundle[]) {
        // eslint-disable-next-line no-console
        this.taskQueue.queue(async () => this.updateImpl(newBundles)).catch((error) => console.error(error));
    }

    private async updateImpl(newBundles: readonly AssetBundle[]) {
        this.updateGroups();
        const promises = new Map<number, Promise<number>>(
            newBundles.map<[number, Promise<number>]>((b, i) => [i, AssetCollection.queryBundleData(b, i)]),
        );

        while (promises.size > 0) {
            // We're waiting for all promises at once, the loop is only here for updating purposes
            // eslint-disable-next-line no-await-in-loop
            await this.waitForResponses(promises);
        }
    }

    private async waitForResponses(promises: Map<number, Promise<number>>) {
        const delayId = Number.MAX_SAFE_INTEGER;

        if (!promises.has(delayId)) {
            promises.set(delayId, new Promise((resolve) => setTimeout(resolve, 1000, delayId)));
        }

        const index = await Promise.race(promises.values());

        if (index === delayId) {
            this.updateGroups();
        }

        promises.delete(index);
    }

    private updateGroups() {
        const newGroups = this.getGroups();

        // Remove no longer existing groups
        for (let index = 0; index < this.groups.length;) {
            if (newGroups.has(this.groups[index][this.ordering.groupBys[0]])) {
                ++index;
            } else {
                this.groups.splice(index, 1);
            }
        }

        // Update existing groups with new assets
        for (const newGroup of newGroups) {
            const existingGroup = this.groups.find((g) => g[this.ordering.groupBys[0]] === newGroup[0]);

            if (existingGroup === undefined) {
                this.groups.push(new AssetGroup(this.parent, newGroup[1]));
            } else {
                existingGroup.assets.splice(0, existingGroup.assets.length, ...newGroup[1]);
            }
        }

        AssetCollectionUtility.sort(this.groups, this.ordering.sort);
    }

    private getGroups() {
        const result = new Map<string, Asset[]>();

        for (const bundle of this.bundles) {
            this.addGroups(result, bundle.assets);
        }

        return result;
    }

    private addGroups(result: Map<string, Asset[]>, assets: readonly Asset[]) {
        for (const asset of assets) {
            const groupName = asset[this.ordering.groupBys[0]];
            const groupAssets = result.get(groupName);

            if (groupAssets === undefined) {
                result.set(groupName, [asset]);
            } else {
                groupAssets.push(asset);
            }
        }
    }
}
