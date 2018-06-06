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

type PrimitiveValue = {} | null;
export type CompositeValue = { [K in AllAssetPropertyNames]?: PrimitiveValue };
export type Value = CompositeValue | PrimitiveValue | undefined;

export class ValueUtility {
    public static isComposite(value: Value): value is CompositeValue {
        return value instanceof Object;
    }
}
