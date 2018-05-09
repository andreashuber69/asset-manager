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

import { Asset, IModel } from "./Asset";
import { QuandlRequest } from "./QuandlRequest";

export enum WeightUnit {
    Gram = 1,
    Kilogram = 1000,
    Grain = 0.06479891, // https://en.wikipedia.org/wiki/Grain_(unit)
    TroyOunce = Grain * 480, // https://en.wikipedia.org/wiki/Ounce
    AvdpOunce = Grain * 437.5, // https://en.wikipedia.org/wiki/Ounce
}

/** Provides information about an asset made of a precious metal. */
export abstract class PreciousMetalAsset extends Asset {
    /**
     * Creates a new [[PreciousMetalAsset]] instance.
     * @param parent The parent model to which this asset belongs.
     * @param type The type of precious metal, e.g. Silver, Gold.
     * @param description Describes the precious metal items, e.g. Bars, Coins.
     * @param location The location of the precious metal items, e.g. Safety Deposit Box.
     * @param weightUnit The unit used for `weight`, e.g. [[TroyOunce]].
     * @param weight The weight of a single item, expressed in `weightUnit`.
     * @param fineness The fineness, e.g. 0.999.
     * @param quantity The number of items.
     * @param quandlPath The quandl asset path.
     */
    protected constructor(
        parent: IModel,
        type: string,
        description: string,
        location: string,
        weightUnit: WeightUnit,
        weight: number,
        fineness: number,
        quantity: number,
        quandlPath: string,
    ) {
        super(
            parent, type, description, location, PreciousMetalAsset.getUnit(weightUnit, weight), fineness, quantity, 0);
        this.pureGramsPerUnit = weightUnit * weight * fineness;
        this.queryUnitValue(quandlPath).catch((reason) => console.error(reason));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static getUnit(unit: WeightUnit, weight: number) {
        return `${weight.toFixed(0)} ${this.abbreviate(unit)}`;
    }

    private static abbreviate(unit: WeightUnit) {
        switch (unit) {
            case WeightUnit.Gram:
                return "g";
            case WeightUnit.Kilogram:
                return "kg";
            case WeightUnit.Grain:
                return "gr";
            case WeightUnit.TroyOunce:
                return "oz (troy)";
            case WeightUnit.AvdpOunce:
                return "oz (avdp)";
            default:
                throw new Error("Unknown WeightUnit!");
        }
    }

    private readonly pureGramsPerUnit: number;

    private async queryUnitValue(quandlPath: string) {
        this.unitValueUsd =
            this.pureGramsPerUnit / WeightUnit.TroyOunce * await new QuandlRequest(quandlPath, false).execute();
    }
}
