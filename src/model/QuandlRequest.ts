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

/** Represents a single quandl.com request. */
export class QuandlRequest implements IWebRequest<number> {
    /**
     * Creates a new [[QuandlRequest]] instance.
     * @param path The path to query.
     * @param invert Whether the returned price should be inverted.
     */
    public constructor(private readonly path: string, private readonly invert: boolean) {
    }

    public async execute() {
        if (this.path.length > 0) {
            const response = await QueryCache.fetch(
                `https://www.quandl.com/api/v3/datasets/${this.path}?api_key=ALxMkuJx2XTUqsnsn6qK&rows=1`);
            const price = QuandlRequest.getPrice(response);

            return this.invert ? 1 / price : price;
        } else {
            return 1;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static getPrice(response: {}) {
        if (this.hasStringIndexer(response) && this.hasStringIndexer(response.dataset)) {
            const data = response.dataset.data;

            if ((data instanceof Array) && (data.length >= 1)) {
                const array = data[0];

                if ((array instanceof Array) && (array.length >= 2) && (typeof array[1] === "number")) {
                    return array[1] as number;
                }
            }
        }

        return Number.NaN;
    }

    private static hasStringIndexer(value: any): value is { [key: string]: any } {
        return value instanceof Object;
    }
}
