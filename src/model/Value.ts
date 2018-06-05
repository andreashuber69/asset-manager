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

import { IAuxProperties } from "./IAuxProperties";

export type RequiredPrimitiveValue = boolean | number | string;
export type PrimitiveValue = RequiredPrimitiveValue | undefined;
export type CompositeValue = IAuxProperties<PrimitiveValue>;
export type Value = CompositeValue | PrimitiveValue;

export class ValueUtility {
    public static isComposite(value: Value): value is CompositeValue {
        return typeof value === "object";
    }
}
