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

import { Asset, IModel } from "../model/Asset";
import { IAssetPropertiesIntersection } from "../model/AssetInterfaces";
import { AssetTypes } from "../model/AssetTypes";
import { IAllAssetProperties } from "./IAllAssetProperties";
import { InputInfo } from "./InputInfo";

/** Defines the interface used by the asset editor UI to edit an asset of a given type. */
export interface IAssetEditInfo extends IAllAssetProperties<InputInfo> {
    readonly type: "" | AssetTypes;

    createAsset(parent: IModel, properties: IAssetPropertiesIntersection): Asset;
}