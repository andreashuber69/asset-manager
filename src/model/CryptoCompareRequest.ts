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

import { IWebRequest } from "./IWebRequest";
import { QueryCache } from "./QueryCache";
import { CryptoCompareResponse } from "./validation/schemas/CryptoCompareResponse.schema";

/** Represents a single cryptocompare.com request. */
export class CryptoCompareRequest implements IWebRequest<number> {
    public constructor(private readonly coin: string, private readonly invert: boolean) {
    }

    public async execute() {
        const price = (await QueryCache.fetch(
            `https://min-api.cryptocompare.com/data/price?fsym=${this.coin}&tsyms=USD`, CryptoCompareResponse)).USD;

        return this.invert ? 1 / price : price;
    }
}
