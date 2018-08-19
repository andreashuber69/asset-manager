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

import { IModel } from "./Asset";
import { AssetBundle } from "./AssetBundle";
import { BlockcypherRequest } from "./BlockcypherRequest";
import { GenericAssetBundle } from "./GenericAssetBundle";
import { IRealCryptoWalletParameters, RealCryptoWallet } from "./RealCryptoWallet";
import { Unknown } from "./Value";

/** Represents a wallet the balance of which is requested from blockcypher.com. */
export abstract class BlockcypherWallet extends RealCryptoWallet {
    public bundle(bundle?: Unknown): AssetBundle {
        return new GenericAssetBundle(this);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    protected constructor(parent: IModel, properties: IRealCryptoWalletParameters) {
        super(parent, properties);
    }

    protected queryQuantity() {
        return new BlockcypherRequest(this.unit.toLowerCase(), this.address).execute();
    }
}
