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

import { ICryptoWallet, ICryptoWalletProperties } from "./CryptoWallet";
import { IPreciousMetalAsset, IPreciousMetalAssetProperties } from "./PreciousMetalAsset";

/**
 * Combines the defining properties of all assets.
 * @description Classes implementing this interface could just as well not do so and code would continue to work. In
 * other words, there are no methods taking parameters of this type. Instead, the only purpose of this interface is to
 * have the compiler flag all pieces of code that have to be changed when a new asset type or a new asset property is
 * added.
 */
export type IAllAssetProperties = ICryptoWalletProperties & IPreciousMetalAssetProperties;

/** @internal */
export type IAssetUnion = ICryptoWallet | IPreciousMetalAsset;
