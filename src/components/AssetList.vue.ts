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

import { Component, Vue } from "vue-property-decorator";
import Asset from "./Asset.vue";
import { AssetBundle } from "./AssetBundle";
import { AssetInfo } from "./AssetInfo";
import { BtcQuantityInfo } from "./BtcQuantityInfo";
import { WeigthUnit } from "./PreciousMetalInfo";
import { QueryCache } from "./QueryCache";
import { QueryIterator } from "./QueryIterator";
import { SilverInfo } from "./SilverInfo";

// tslint:disable-next-line:no-unsafe-any
@Component({ components: { Asset } })
// tslint:disable-next-line:no-default-export no-unsafe-any
export default class AssetList extends Vue {
    public currencies = [
        "USD",
        "CHF",
        "EUR",
    ];

    public selectedCurrency = this.currencies[0];

    public bundles = [
        new AssetBundle(new SilverInfo("Home", "5 CHF, Roll of 50", WeigthUnit.Gram, 750, 0.835, 1)),
        new AssetBundle(new SilverInfo("Home", "2 CHF, Roll of 50", WeigthUnit.Gram, 500, 0.835, 2)),
        new AssetBundle(new SilverInfo("Home", "1 CHF, Roll of 50", WeigthUnit.Gram, 250, 0.835, 3)),
        new AssetBundle(new SilverInfo("Home", "0.5 CHF, Roll of 50", WeigthUnit.Gram, 125, 0.835, 4)),
        new AssetBundle(new BtcQuantityInfo(AssetList.address, "Spending Wallet")),
    ];

    public get assets() {
        return this.bundles.reduce((result, bundle) => result.concat(bundle.assets), new Array<AssetInfo>());
    }

    public get totalValueInteger() {
        return AssetInfo.formatInteger(this.grandTotalValue);
    }

    public get totalValueFraction() {
        return AssetInfo.formatFraction(this.grandTotalValue, 2);
    }

    public mounted() {
        return AssetList.update(this.assets);
    }

    public add() {
        const bundle = new AssetBundle(new SilverInfo("Home", "Bars", WeigthUnit.Kilogram, 1, 0.999, 3));
        this.bundles.push(bundle);

        return AssetList.update(bundle.assets);
    }

    public currencyChanged() {
        this.selectedCurrency.toString();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // tslint:disable-next-line:max-line-length
    private static readonly address = "1F8i3SE7Zorf6F2rLh3Mxg4Mb8aHT2nkQf";

    private static async update(assets: AssetInfo[]) {
        const iterators = AssetList.createIterators(assets);

        while (iterators.size > 0) {
            const queries = AssetList.getQueries(iterators);

            for (const [query, sameQueryAssets] of queries) {
                const response = await this.getQueryResponse(query);

                for (const asset of sameQueryAssets) {
                    asset.processCurrentQueryResponse(response);
                    (iterators.get(asset) as QueryIterator).advance();
                }
            }
        }
    }

    private static createIterators(assets: AssetInfo[]) {
        const result = new Map<AssetInfo, QueryIterator>();

        for (const asset of assets) {
            result.set(asset, new QueryIterator(asset.queries));
        }

        return result;
    }

    private static getQueries(queryIterators: Map<AssetInfo, QueryIterator>): Map<string, AssetInfo[]> {
        const queries = new Map<string, AssetInfo[]>();
        const doneAssets = new Array<AssetInfo>();

        for (const [asset, queryIterator] of queryIterators) {
            if (queryIterator.value) {
                let equalQueryAssets = queries.get(queryIterator.value);

                if (!equalQueryAssets) {
                    equalQueryAssets = new Array<AssetInfo>();
                    queries.set(queryIterator.value, equalQueryAssets);
                }

                equalQueryAssets.push(asset);
            } else {
                doneAssets.push(asset);
            }
        }

        for (const asset of doneAssets) {
            queryIterators.delete(asset);
        }

        return queries;
    }

    private static async getQueryResponse(query: string) {
        try {
            return JSON.parse(await QueryCache.fetch(query));
        } catch {
            // It appears that after catch (e), e is sometimes undefined at this point, which is why we go with plain
            // catch.
            return { error: "Can't fetch or parse response." };
        }
    }

    private get grandTotalValue() {
        return this.assets.reduce<number | undefined>(
            (s, a) => s === undefined ? a.totalValue : s + (a.totalValue === undefined ? 0 : a.totalValue), undefined);
    }
}
