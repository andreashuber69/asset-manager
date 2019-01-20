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

import { AssetBundle, ISerializedBundle } from "./AssetBundle";
import { CryptoWallet } from "./CryptoWallet";
import { MiscAsset } from "./MiscAsset";
import { PreciousMetalAsset } from "./PreciousMetalAsset";

/** Defines a bundle containing a single asset. */
export class GenericAssetBundle extends AssetBundle {
    public readonly assets: Array<CryptoWallet | PreciousMetalAsset | MiscAsset>;

    /** @internal */
    public constructor(asset: CryptoWallet | PreciousMetalAsset | MiscAsset) {
        super();
        this.assets = [ asset ];
    }

    public deleteAsset(asset: CryptoWallet | PreciousMetalAsset | MiscAsset) {
        const index = this.assets.indexOf(asset);

        if (index >= 0) {
            this.assets.splice(index, 1);
        }
    }

    public queryData() {
        return this.assets[0].queryData();
    }

    public toJSON(): ISerializedBundle {
        return {
            primaryAsset: this.assets[0],
        };
    }
}
