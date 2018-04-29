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

import { IWebRequest } from "./IWebRequest";
import { QueryCache } from "./QueryCache";

export class CoinMarketCapRequest implements IWebRequest<number> {
    public constructor(private readonly coin: string) {
    }

    public async execute() {
        return 1 / CoinMarketCapRequest.getPrice(
            await QueryCache.fetch(`https://api.coinmarketcap.com/v1/ticker/${this.coin}/`));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static getPrice(response: any) {
        return this.isPriceInfo(response) ? Number.parseFloat(response[0].price_usd) : Number.NaN;
    }

    private static isPriceInfo(value: any): value is Array<{ price_usd: string }> {
        return this.isLengthOneObjectArray(value) && (typeof value[0].price_usd === "string");
    }

    private static isLengthOneObjectArray(value: any): value is Array<{ [key: string]: any }> {
        return this.isArray(value) && (value.length === 1) && this.hasStringIndexer(value[0]);
    }

    private static isArray(value: any): value is any[] {
        return value instanceof Array;
    }

    private static hasStringIndexer(value: any): value is { [key: string]: any } {
        return value instanceof Object;
    }
}