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
import { AssetBundle, ISerializedBundle } from "./AssetBundle";
import { ISerializedAsset } from "./AssetInterfaces";
import { CryptoWallet, ICryptoWalletProperties } from "./CryptoWallet";
import { Erc20TokenWallet } from "./Erc20TokenWallet";
import { QueryCache } from "./QueryCache";
import { Unknown, Value } from "./Value";

interface ISerializedEthBundle extends ISerializedBundle {
    [key: string]: ISerializedAsset | string[];
}

/** Represents an ETH wallet. */
export class EthWallet extends CryptoWallet {
    public static readonly type = "Ethereum";

    public readonly type = EthWallet.type;

    /** Creates a new [[EthWallet]] instance.
     * @description If a non-empty string is passed for [[ICryptoWalletProperties.address]], then an attempt is made to
     * retrieve the wallet balance, which is then added to whatever is passed for [[ICryptoWalletProperties.quantity]].
     * It therefore usually only makes sense to specify either address or quantity, not both.
     * @param parent The parent model to which this asset belongs.
     * @param properties The crypto wallet properties.
     */
    public constructor(parent: IModel, properties: ICryptoWalletProperties) {
        super(parent, properties, "ETH", "ethereum");
        this.queryQuantity().catch((reason) => console.error(reason));
    }

    public bundle(bundle?: Unknown): AssetBundle {
        return new EthWallet.EthBundle(this, bundle);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // tslint:disable-next-line:max-classes-per-file variable-name
    private static readonly EthBundle = class NestedEthBundle extends AssetBundle {
        public readonly assets: Asset[] = [];

        public constructor(private readonly ethWallet: EthWallet, bundle?: Unknown) {
            super();
            this.assets.push(ethWallet);

            if (Value.hasArrayProperty(bundle, NestedEthBundle.deletedAssetsName)) {
                // tslint:disable-next-line:no-unbound-method
                this.deletedAssets = bundle[NestedEthBundle.deletedAssetsName].filter(Value.isString);
            }

            this.addTokenWallets().catch((reason) => console.error(reason));
        }

        public deleteAsset(asset: Asset) {
            const index = this.assets.indexOf(asset);

            if (index >= 0) {
                this.deletedAssets.push(this.assets[index].unit);
                this.assets.splice(index, index === 0 ? this.assets.length : 1);
            }
        }

        public toJSON(): ISerializedBundle {
            const result: ISerializedEthBundle = {
                primaryAsset: this.ethWallet.toJSON(),
            };

            result[NestedEthBundle.deletedAssetsName] = this.deletedAssets;

            return result;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private static readonly deletedAssetsName = "deletedAssets";

        private readonly deletedAssets: string[] = [];

        private async addTokenWallets() {
            if (!this.ethWallet.address) {
                return;
            }

            const balances = await QueryCache.fetch(
                `https://api.ethplorer.io/getAddressInfo/${this.ethWallet.address}?apiKey=dvoio1769GSrYx63`);

            if (!Value.hasArrayProperty(balances, "tokens")) {
                return;
            }

            for (const token of balances.tokens) {
                await this.addTokenWallet(token);
            }
        }

        private async addTokenWallet(token: Unknown | null | undefined) {
            if (!Value.hasObjectProperty(token, "tokenInfo") || !Value.hasNumberProperty(token, "balance")) {
                return;
            }

            const info = token.tokenInfo;

            if (!Value.hasStringProperty(info, "symbol") ||
                (!Value.hasNumberProperty(info, "decimals") && !Value.hasStringProperty(info, "decimals"))) {
                return;
            }

            if (this.deletedAssets.indexOf(info.symbol) >= 0) {
                return;
            }

            if (!Value.hasObjectProperty(info, "price") || !Value.hasStringProperty(info.price, "rate") ||
                !Value.hasStringProperty(info.price, "currency") || (info.price.currency !== "USD")) {
                return;
            }

            if (token.balance > 0) {
                const newProperties = {
                    ...this.ethWallet as ICryptoWalletProperties,
                    quantity: token.balance / Math.pow(10, Number.parseFloat(info.decimals.toString())),
                };

                this.assets.push(new Erc20TokenWallet(
                    this.ethWallet.parent, newProperties, info.symbol, Number.parseFloat(info.price.rate)));
            }
        }
    };

    private static getQuantity(response: Unknown | null) {
        if (!Value.hasObjectProperty(response, "ETH") || !Value.hasNumberProperty(response.ETH, "balance")) {
            return Number.NaN;
        }

        return response.ETH.balance;
    }

    private async queryQuantity() {
        if (this.address) {
            const quantity = EthWallet.getQuantity(await QueryCache.fetch(
                `https://api.ethplorer.io/getAddressInfo/${this.address}?` +
                "token=0x0000000000000000000000000000000000000000&apiKey=dvoio1769GSrYx63"));
            this.quantity = (this.quantity === undefined ? 0 : this.quantity) + quantity;
        }
    }
}
