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

import { AssetType } from "./AssetType";
import { ICryptoWallet } from "./ICryptoWallet";
import { ICryptoWalletProperties } from "./ICryptoWalletProperties";
import { IMiscAsset } from "./IMiscAsset";
import { IMiscAssetProperties } from "./IMiscAssetProperties";
import { IPreciousMetalAsset } from "./IPreciousMetalAsset";
import { IPreciousMetalAssetProperties } from "./IPreciousMetalAssetProperties";

/** Combines the defining properties of all assets. */
export type IAssetIntersection = IPreciousMetalAssetProperties & ICryptoWalletProperties & IMiscAssetProperties;

export interface ITaggedAssetIntersection extends IAssetIntersection {
    readonly type: keyof typeof AssetType;
}

export type AssetPropertyName = keyof IAssetIntersection;

export const allAssetPropertyNames: AssetPropertyName[] = [
    "description", "location", "quantity", "notes", "weight",
    "weightUnit", "fineness", "address", "value", "valueCurrency",
];

/** @internal */
export type IAssetUnion = IPreciousMetalAsset | ICryptoWallet | IMiscAsset;

/** @internal */
export type TaggedAssetPropertyName = keyof ITaggedAssetIntersection;
