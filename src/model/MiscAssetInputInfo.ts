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

import { AssetInputInfo, IAssetConstructor } from "./AssetInputInfo";
import { Currency } from "./Currency";
import { SelectInputInfo } from "./SelectInputInfo";
import { TextInputInfo } from "./TextInputInfo";
import { WeightUnit } from "./WeightUnit";

/**
 * Defines how the properties of a miscellaneous asset need to be input and validated and provides a method to create a
 * representation of the asset.
 */
export class MiscAssetInputInfo extends AssetInputInfo {
    public static readonly valueDigits = 2;
    public readonly type = "Misc";
    public readonly description = new TextInputInfo({
        label: "Description", hint: "The nature of the items, e.g. 'Cash', 'Vacation House'.",
        isPresent: true, isRequired: true,
    });
    public readonly location = new TextInputInfo({
        label: "Location", hint: "The location, e.g. 'Safe', 'Redford'.", isPresent: true, isRequired: false,
    });
    public readonly address = new TextInputInfo();
    public readonly weight = new TextInputInfo();
    public readonly weightUnit = new SelectInputInfo<typeof WeightUnit>();
    public readonly fineness = new TextInputInfo();
    public readonly value = new TextInputInfo({
        label: "Value",
        hint: "The value of a single item, expressed in Currency. A liability can be expressed with a negative number",
        isPresent: true, isRequired: true, min: undefined, max: undefined, step: MiscAssetInputInfo.valueStep,
    });
    public readonly valueCurrency = new SelectInputInfo({
        label: "Currency", hint: "The currency Value is expressed in.", isPresent: true, isRequired: true,
        enumType: Currency, acceptStringsOnly: true,
    });
    public readonly quantity = new TextInputInfo({
        label: "Quantity", hint: "The number of items.", isPresent: true, isRequired: true, min: 0,
    });

    /** @internal */
    public constructor(ctor: IAssetConstructor) {
        super(ctor);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static readonly valueStep = Math.pow(10, -MiscAssetInputInfo.valueDigits);
}
