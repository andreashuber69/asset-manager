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
import { IAssetUnion, ISerializedAsset } from "./AssetInterfaces";
import { AssetType } from "./AssetTypes";
import { CryptoWallet } from "./CryptoWallet";
import { ICryptoWalletProperties } from "./ICryptoWallet";
import { QueryCache } from "./QueryCache";
import { RealCryptoWallet } from "./RealCryptoWallet";
import { Unknown, Value } from "./Value";

interface ISerializedErc20TokensBundle extends ISerializedBundle {
    deletedAssets: string[];
}

/** Represents a wallet for ERC20 tokens. */
export class Erc20TokensWallet extends RealCryptoWallet {
    public readonly type = AssetType.Erc20;

    /** Creates a new [[Erc20TokensWallet]] instance.
     * @description This wallet requires an [[ICryptoWalletProperties.address]] and ignores
     * [[ICryptoWalletProperties.quantity]].
     * @param parent The parent model to which this asset belongs.
     * @param properties The crypto wallet properties.
     */
    public constructor(parent: IModel, properties: ICryptoWalletProperties) {
        super(parent, properties, ""); // TODO: Make currency symbol optional?
    }

    public bundle(bundle?: Unknown): AssetBundle {
        return new Erc20TokensWallet.Bundle(this, bundle);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // tslint:disable-next-line:max-classes-per-file variable-name
    private static readonly TokenWallet = class NestedTokenWallet extends CryptoWallet {
        public get type() {
            return this.editable.type;
        }

        public get description() {
            return this.editable.description;
        }

        public get location() {
            return this.editable.location;
        }

        public get address() {
            return this.editable.address;
        }

        public get notes() {
            return this.editable.notes;
        }

        public get editableAsset() {
            return this.editable;
        }

        public get interface(): IAssetUnion {
            throw new Error("Can't get non-real wallet interface.");
        }

        /** @internal */
        public constructor(
            private readonly editable: Erc20TokensWallet,
            currencySymbol: string, quantity: number, unitValueUsd: number) {
            super(editable.parent, currencySymbol);
            this.quantity = quantity;
            this.unitValueUsd = unitValueUsd;
        }

        // tslint:disable-next-line:prefer-function-over-method
        public toJSON(): ISerializedAsset {
            throw new Error("Can't serialize non-real wallet");
        }
    };

    // tslint:disable-next-line:max-classes-per-file variable-name
    private static readonly Bundle = class NestedBundle extends AssetBundle {
        public readonly assets: Asset[] = [];

        public constructor(private readonly erc20Wallet: Erc20TokensWallet, bundle?: Unknown) {
            super();

            if (Value.hasArrayProperty(bundle, NestedBundle.deletedAssetsName)) {
                // tslint:disable-next-line:no-unbound-method
                this.deletedAssets = bundle[NestedBundle.deletedAssetsName].filter(Value.isString);
            }
        }

        public deleteAsset(asset: Asset) {
            const index = this.assets.indexOf(asset);

            if (index >= 0) {
                this.deletedAssets.push(this.assets[index].unit);
                this.assets.splice(index, index === 0 ? this.assets.length : 1);
            }
        }

        public async queryData() {
            await this.erc20Wallet.queryData();

            if (!this.erc20Wallet.address) {
                return;
            }

            const balances = await QueryCache.fetch(
                `https://api.ethplorer.io/getAddressInfo/${this.erc20Wallet.address}?apiKey=dvoio1769GSrYx63`);

            if (!Value.hasArrayProperty(balances, "tokens")) {
                return;
            }

            for (const token of balances.tokens) {
                this.addTokenWallet(token);
            }
        }

        public toJSON(): ISerializedErc20TokensBundle {
            return {
                primaryAsset: this.erc20Wallet.toJSON(),
                deletedAssets: this.deletedAssets,
            };
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private static readonly deletedAssetsName = NestedBundle.getName("deletedAssets");

        private static getName<T extends keyof ISerializedErc20TokensBundle>(name: T) {
            return name;
        }

        private readonly deletedAssets: string[] = [];

        private addTokenWallet(token: Unknown | null | undefined) {
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
                this.assets.push(new Erc20TokensWallet.TokenWallet(
                    this.erc20Wallet, info.symbol,
                    token.balance / Math.pow(10, Number.parseFloat(info.decimals.toString())),
                    Number.parseFloat(info.price.rate)));
            }
        }
    };
}