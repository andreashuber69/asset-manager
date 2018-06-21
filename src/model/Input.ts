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

import { AllAssetPropertyNames } from "./AssetInterfaces";
import { Unknown } from "./Value";

export type CompositeInput = { [K in AllAssetPropertyNames]?: Unknown | null };
export type Input = CompositeInput | Unknown | null | undefined;

export class InputUtility {
    public static isComposite(input: Input): input is CompositeInput {
        return input instanceof Object;
    }
}