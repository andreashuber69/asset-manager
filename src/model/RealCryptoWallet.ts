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

import { IParent } from "./Asset";
import { CryptoCompareRequest } from "./CryptoCompareRequest";
import { CryptoWallet } from "./CryptoWallet";
import { QueryUtility } from "./QueryUtility";
import { ISimpleCryptoWalletProperties } from "./validation/schemas/ISimpleCryptoWalletProperties.schema";
import { QuantityAny } from "./validation/schemas/QuantityAny.schema";

export type IRealCryptoWalletParameters = ISimpleCryptoWalletProperties & {
    /** The crypto currency symbol, e.g. 'BTC', 'LTC'. */
    readonly currencySymbol: string;

    /** TODO: remove */
    readonly slug?: string;
};

/** Defines the base of all classes that represent a real crypto currency wallet. */
export abstract class RealCryptoWallet extends CryptoWallet {
    public readonly description: string;

    public readonly address: string;

    public readonly location: string;

    public readonly notes: string;

    /** @internal */
    public async queryData(): Promise<void> {
        await super.queryData();

        if (this.address) {
            const { result, status } = await QueryUtility.execute(() => this.queryQuantity());

            if (result !== undefined) {
                this.quantity = (this.quantity === undefined ? 0 : this.quantity) + result;
            }

            this.quantityHint = status;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // TODO: This is a hack to work around the fact that the spread operator does not call property getters:
    // https://github.com/Microsoft/TypeScript/issues/26547
    protected static getProperties(
        // TODO: remove slug
        props: ISimpleCryptoWalletProperties, currencySymbol: string, slug?: string,
    ): IRealCryptoWalletParameters {
        const { description, location, notes } = props;
        const address = ("address" in props) && props.address || undefined;
        const quantity = ("quantity" in props) && props.quantity || undefined;

        return {
            ...RealCryptoWallet._getProperties(description, location, address, quantity, notes), currencySymbol, slug,
        };
    }

    /** Creates a new [[RealCryptoWallet]] instance.
     * @description If a non-empty string is passed for [[IRealCryptoWalletParameters.address]], then an attempt is made
     * to retrieve the wallet balance, which is then added to whatever is passed for
     * [[IRealCryptoWalletParameters.quantity]]. It therefore usually only makes sense to specify either address or
     * quantity, not both.
     * @param parent The parent model to which this asset belongs.
     * @param params The crypto wallet parameters.
     */
    protected constructor(parent: IParent, params: IRealCryptoWalletParameters) {
        super(parent, params.currencySymbol);
        this.description = params.description;
        this.location = params.location || "";
        this.address = ("address" in params) && params.address || "";
        this.quantity = ("quantity" in params) && params.quantity || undefined;
        this.notes = params.notes || "";
        this.slug = params.slug;
    }

    // tslint:disable-next-line:prefer-function-over-method
    protected queryQuantity(): Promise<number | undefined> {
        return Promise.resolve(undefined);
    }

    protected queryUnitValueUsd() {
        return this.slug ? new CryptoCompareRequest(this.slug, false).execute() : Promise.resolve(undefined);
    }

    /** @internal */
    protected getProperties(): ISimpleCryptoWalletProperties {
        return RealCryptoWallet._getProperties(
            this.description,
            this.location || undefined,
            this.address || undefined,
            this.address ? undefined : this.quantity,
            this.notes || undefined,
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static _getProperties(
        description: string,
        location: string | undefined,
        address: string | undefined,
        quantity: QuantityAny | undefined,
        notes: string | undefined,
    ): ISimpleCryptoWalletProperties {
        if (address) {
            return { description, location, address, notes };
        } else if (quantity) {
            return { description, location, quantity, notes };
        } else {
            throw new Error("Unexpected ISimpleCryptoWalletProperties value!");
        }
    }

    private readonly slug?: string;
}
