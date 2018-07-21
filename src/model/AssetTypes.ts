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

export enum AssetType {
    None = "",
    Ag = "Silver",
    Pd = "Palladium",
    Pt = "Platinum",
    Au = "Gold",
    Btc = "Bitcoin",
    Ltc = "Litecoin",
    Etc = "Ethereum Classic",
    Eth = "Ethereum",
    Erc20 = "ERC20 Token",
    Btg = "Bitcoin Gold",
    Dash = "Dash",
    Zec = "Zcash",
}

export type EditablePreciousMetalAssetType = AssetType.Ag | AssetType.Pd | AssetType.Pt | AssetType.Au;

export type EditableCryptoWalletType =
    AssetType.Btc | AssetType.Ltc | AssetType.Etc | AssetType.Eth | AssetType.Btg | AssetType.Dash | AssetType.Zec;

export type EditableAssetType = AssetType.None | EditablePreciousMetalAssetType | EditableCryptoWalletType;
