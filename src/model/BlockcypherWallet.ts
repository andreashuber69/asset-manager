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
import { ICryptoWalletProperties } from "./ICryptoWallet";
import { RealCryptoWallet } from "./RealCryptoWallet";
import { Unknown } from "./Value";

/** Represents a wallet the balance of which is requested from blockcypher.com. */
export abstract class BlockcypherWallet extends RealCryptoWallet {
    public bundle(bundle?: Unknown): AssetBundle {
        return new GenericAssetBundle(this);
    }

    /** @internal */
    public async queryData(): Promise<void> {
        await super.queryData();

        if (this.address) {
            this.quantity = (this.quantity === undefined ? 0 : this.quantity) +
                await new BlockcypherRequest(this.unit.toLowerCase(), this.address).execute();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    protected constructor(parent: IModel, properties: ICryptoWalletProperties, currencySymbol: string, slug: string) {
        super(parent, properties, currencySymbol, slug);
    }
}
