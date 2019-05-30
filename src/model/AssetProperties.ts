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

import { Asset, IModel } from "./Asset";
import { AssetEditorData } from "./AssetEditorData";
import { IAssetIntersection } from "./AssetInterfaces";
import { TaggedObjectConverter } from "./TaggedObjectConverter";
import { AssetTypeName } from "./validation/schemas/AssetTypeName";
import { Erc20TokensWalletTypeName, ITaggedErc20TokensWallet } from "./validation/schemas/ITaggedErc20TokensWallet";
import { ITaggedMiscAsset, MiscAssetTypeName } from "./validation/schemas/ITaggedMiscAsset";
import { ITaggedPreciousMetalAsset, PreciousMetalAssetTypeName } from "./validation/schemas/ITaggedPreciousMetalAsset";
import { ITaggedSimpleCryptoWallet, SimpleCryptoWalletTypeName } from "./validation/schemas/ITaggedSimpleCryptoWallet";
import { TaggedObjectUnion } from "./validation/schemas/TaggedObjectUnion";
import { WeightUnit } from "./validation/schemas/WeightUnit";

abstract class AssetProperties<T extends AssetTypeName> {
    public get type(): T {
        return AssetProperties.validate("type", this.data.type) as T;
    }

    public get description() {
        return AssetProperties.validate("description", this.data.description);
    }

    public get location() {
        return this.data.location;
    }

    public get address() {
        return this.data.address;
    }

    public get weight() {
        return Number.parseFloat(AssetProperties.validate("weight", this.data.weight));
    }

    public get weightUnit() {
        return WeightUnit[AssetProperties.validate("weightUnit", this.data.weightUnit)];
    }

    public get fineness() {
        return Number.parseFloat(AssetProperties.validate("fineness", this.data.fineness));
    }

    public get value() {
        return Number.parseFloat(AssetProperties.validate("value", this.data.value));
    }

    public get valueCurrency() {
        return AssetProperties.validate("valueCurrency", this.data.valueCurrency);
    }

    public get quantity() {
        return this.data.quantity ? Number.parseFloat(this.data.quantity) : undefined;
    }

    public get notes() {
        return this.data.notes;
    }

    public constructor(private readonly data: AssetEditorData) {
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static validate<T extends string | undefined>(name: string, value: T): Exclude<T, undefined | ""> {
        if (!value) {
            throw new Error(`Unexpected ${name}.`);
        }

        return value as Exclude<T, undefined | "">;
    }
}

// tslint:disable-next-line: max-classes-per-file
class PreciousMetalProperties extends AssetProperties<PreciousMetalAssetTypeName> implements ITaggedPreciousMetalAsset {
}

// tslint:disable-next-line: max-classes-per-file
class SimpleCryptoWalletProperties extends
    AssetProperties<SimpleCryptoWalletTypeName> implements ITaggedSimpleCryptoWallet {
}

// tslint:disable-next-line: max-classes-per-file
class Erc20TokensWalletProperties extends
    AssetProperties<Erc20TokensWalletTypeName> implements ITaggedErc20TokensWallet {
}

// tslint:disable-next-line: max-classes-per-file
class MiscAssetProperties extends AssetProperties<MiscAssetTypeName> implements ITaggedMiscAsset {
}

// tslint:disable-next-line: only-arrow-functions
export function getProperties(data: AssetEditorData): IAssetIntersection {
    // tslint:disable-next-line: switch-default
    switch (data.type) {
        case "Silver":
        case "Palladium":
        case "Platinum":
        case "Gold":
            return new PreciousMetalProperties(data);
        case "Bitcoin":
        case "Litecoin":
        case "Ethereum Classic":
        case "Ethereum":
        case "Bitcoin Gold":
        case "Dash":
        case "Zcash":
            return new SimpleCryptoWalletProperties(data);
        case "ERC20 Tokens":
            return new Erc20TokensWalletProperties(data);
        case "Misc":
            return new MiscAssetProperties(data);
        case "":
            throw new Error("Invalid asset type!");
    }
}

// tslint:disable-next-line: only-arrow-functions
export function createAsset(parent: IModel, data: AssetEditorData) {
    if (data.type === "") {
        throw new Error("Invalid asset type!");
    }

    return TaggedObjectConverter.convert(
        { type: data.type },
        [
            (value, info) => ((model: IModel) => info.createAsset(model, new PreciousMetalProperties(data)) as Asset),
            (value, info) => ((model: IModel) => info.createAsset(model, new SimpleCryptoWalletProperties(data))),
            (value, info) => ((model: IModel) => info.createAsset(model, new Erc20TokensWalletProperties(data))),
            (value, info) => ((model: IModel) => info.createAsset(model, new MiscAssetProperties(data))),
        ],
    )[1](parent);
}
