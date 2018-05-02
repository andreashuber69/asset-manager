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

export class QuandlRequest implements IWebRequest<number> {
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

    private static getPrice(response: any) {
        return this.hasDatasetProperty(response) && this.hasDataTupleArray(response.dataset) ?
            response.dataset.data[0][1] : Number.NaN;
    }

    private static hasDatasetProperty(value: any): value is { dataset: object } {
        return this.hasStringIndexer(value) && (value.dataset instanceof Object);
    }

    private static hasDataTupleArray(value: any): value is { data: Array<[ string, number ]> } {
        return this.hasDataArrayArray(value) && (value.data[0].length >= 2) &&
            (typeof value.data[0][0] === "string") && (typeof value.data[0][1] === "number");
    }

    private static hasDataArrayArray(value: any): value is { data: any[][] } {
        return this.hasDataArray(value) && (value.data.length >= 1) && (value.data[0] instanceof Array);
    }

    private static hasDataArray(value: any): value is { data: any[] } {
        return this.hasStringIndexer(value) && (value.data instanceof Array);
    }

    private static hasStringIndexer(value: any): value is { [key: string]: any } {
        return value instanceof Object;
    }
}
