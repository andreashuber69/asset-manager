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

import { PreciousMetalInfo, WeigthUnit } from "./PreciousMetalInfo";

/** Provides information about an asset made of silver. */
export class SilverInfo extends PreciousMetalInfo {
    /**
     * Creates a new [[SilverInfo]] instance.
     * @param location The location of the silver, e.g. Saftey Deposit Box or Home Safe.
     * @param description Describes the silver items, e.g. Bars, Coins, Medallions.
     * @param quantity The number of items.
     * @param weightUnit The unit used for `weight`, e.g. [[TroyOunce]].
     * @param weight The weight of a single item, expressed in `weightUnit`.
     * @param fineness The fineness, e.g. 0.999.
     */
    public constructor(
        location: string,
        description: string,
        quantity: number,
        weightUnit: WeigthUnit,
        weight: number,
        fineness: number,
    ) {
        super(location, description, "Silver", quantity, weightUnit, weight, fineness);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** @internal */
    public get queries() {
        return SilverInfo.getQueriesImpl();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static * getQueriesImpl() {
        yield "https://www.quandl.com/api/v1/datasets/lbma/silver.json?rows=1";
    }
}
