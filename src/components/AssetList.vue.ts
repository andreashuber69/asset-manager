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
import { CryptoAssetInfo } from "./CryptoAssetInfo";
import { PreciousMetalInfo } from "./PreciousMetalInfo";

// tslint:disable-next-line:no-unsafe-any
@Component({ components: { Asset } })
// tslint:disable-next-line:no-default-export no-unsafe-any
export default class AssetList extends Vue {
    public assetInfos = [
        new PreciousMetalInfo(1, "One", "Silver", "Home", "oz", 300),
        new CryptoAssetInfo(2, "Two", "BTC", "32kp8B1VRRY7EHumToKj8YZzt3A6VtxmSA", "BTC"),
    ];

}
