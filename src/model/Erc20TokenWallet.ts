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

import { CryptoWallet } from "./CryptoWallet";
import { AddressCryptoWalletTypeName } from "./validation/schemas/IAddressCryptoWallet.schema";
import { QuantityAny } from "./validation/schemas/QuantityAny.schema";
import { IEditable } from "./IEditable";

interface IEditableErc20TokensWallet extends IEditable {
    readonly type: AddressCryptoWalletTypeName;
    readonly description: string;
    readonly location: string;
    readonly address: string;
    readonly notes: string;
}

interface ITokenWalletParameters {
    readonly editable: IEditableErc20TokensWallet;
    readonly currencySymbol: string;
    readonly quantity: QuantityAny;
    readonly quantityHint: string;
    readonly unitValueUsd?: number;
}

export class Erc20TokenWallet extends CryptoWallet {
    public get type(): AddressCryptoWalletTypeName {
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

    /** @internal */
    public constructor({ editable, currencySymbol, quantity, quantityHint, unitValueUsd }: ITokenWalletParameters) {
        super(editable.parent, currencySymbol);
        this.editable = editable;
        this.quantity = quantity;
        this.quantityHint = quantityHint;
        this.unitValueUsd = unitValueUsd;
    }

    // eslint-disable-next-line class-methods-use-this
    public toJSON(): never {
        throw new Error(`${Erc20TokenWallet.name} cannot be serialized.`);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private readonly editable: IEditableErc20TokensWallet;
}
