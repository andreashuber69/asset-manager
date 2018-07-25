// Copyright (C) 2018 Andreas Huber Dönni
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

import { Asset, IModel } from "./Asset";
import { IAssetUnion, ISerializedAsset } from "./AssetInterfaces";
import { AssetType } from "./AssetTypes";

export class AssetGroup extends Asset {
    public isExpanded = false;

    public get isExpandable() {
        return true;
    }

    public get type() {
        return this.coalesce((a) => a.type) || AssetType.None;
    }

    public get description() {
        return this.coalesce((a) => a.description) || "";
    }

    public get location() {
        return this.coalesce((a) => a.location) || "";
    }

    public get unit() {
        return this.coalesce((a) => a.unit) || "";
    }

    public get fineness() {
        return this.coalesce((a) => a.fineness);
    }

    public get quantity() {
        return (this.type && this.unit) ?
            this.assets.reduce<number | undefined>((s, a) => AssetGroup.add(s, a.quantity), 0) : undefined;
    }

    public get displayDecimals() {
        return this.coalesce((a) => a.displayDecimals) || 0;
    }

    public get notes() {
        return this.assets.reduce((s, a) => `${s}${a.notes}\n`, "");
    }

    public get unitValue() {
        return this.coalesce((a) => a.unitValue);
    }

    public get totalValue() {
        return this.assets.reduce<number | undefined>((s, a) => AssetGroup.add(s, a.totalValue), 0);
    }

    public get hasActions() {
        return false;
    }

    public get interface(): IAssetUnion {
        throw new Error(`${AssetGroup.name} cannot be edited.`);
    }

    public constructor(parent: IModel, public readonly assets: Asset[]) {
        super(parent);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public toJSON(): ISerializedAsset {
        throw new Error(`${AssetGroup.name} cannot be serialized.`);
    }

    /** @internal */
    public expand() {
        this.isExpanded = !this.isExpanded;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static add(addend1: number | undefined, addend2: number | undefined) {
        return (addend1 === undefined) || (addend2 === undefined) ? undefined : addend1 + addend2;
    }

    private coalesce<T>(getProperty: (asset: Asset) => T): T | undefined {
        let previous: T | undefined;

        for (let index = 0; index < this.assets.length; ++index) {
            if (index === 0) {
                previous = getProperty(this.assets[index]);
            } else {
                if (getProperty(this.assets[index]) !== previous) {
                    return undefined;
                }
            }
        }

        return previous;
    }
}