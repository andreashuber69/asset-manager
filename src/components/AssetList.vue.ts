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
import { AssetInfo } from "./AssetInfo";
import { CryptoAssetInfo } from "./CryptoAssetInfo";
import { WeigthUnit } from "./PreciousMetalInfo";
import { SilverInfo } from "./SilverInfo";

// tslint:disable-next-line:no-unsafe-any
@Component({ components: { Asset } })
// tslint:disable-next-line:no-default-export no-unsafe-any
export default class AssetList extends Vue {
    public assets: AssetInfo[] = [
        new SilverInfo("Home", "5 CHF, Roll of 50", 1, WeigthUnit.Gram, 750, 0.835),
        new SilverInfo("Home", "2 CHF, Roll of 50", 2, WeigthUnit.Gram, 500, 0.835),
        new SilverInfo("Home", "1 CHF, Roll of 50", 3, WeigthUnit.Gram, 250, 0.835),
        new SilverInfo("Home", "0.5 CHF, Roll of 50", 4, WeigthUnit.Gram, 125, 0.835),
        new CryptoAssetInfo(AssetList.address, "Spending Wallet", "BTC"),
    ];

    public async mounted() {
        let queries: Map<string, AssetInfo[]>;

        for (const asset of this.assets) {
            asset.initializeQueries();
        }

        do {
            queries = new Map<string, AssetInfo[]>();

            for (const asset of this.assets) {
                if (asset.currentQuery) {
                    let equalQueryAssets = queries.get(asset.currentQuery);

                    if (!equalQueryAssets) {
                        equalQueryAssets = new Array<AssetInfo>();
                        queries.set(asset.currentQuery, equalQueryAssets);
                    }

                    equalQueryAssets.push(asset);
                }
            }

            for (const [query, assets] of queries) {
                const response = await (await window.fetch(query)).text();

                for (const asset of assets) {
                    asset.currentQueryResult = response;
                    asset.nextQuery();
                }
            }
        } while (queries.size > 0);
    }

    // tslint:disable-next-line:max-line-length
    private static readonly address = "1F8i3SE7Zorf6F2rLh3Mxg4Mb8aHT2nkQf";
}
