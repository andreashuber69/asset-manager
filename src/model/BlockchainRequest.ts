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

interface ISummary {
    readonly final_balance: number;
    readonly n_tx: number;
}

export interface IBalance {
    readonly finalBalance: number;
    readonly transactionCount: number;
}

export class BlockchainRequest implements IWebRequest<IBalance> {
    public constructor(addresses: string[]) {
        this.addresses = addresses.join("|");
    }

    public async execute() {
        return BlockchainRequest.getFinalBalance(
            await QueryCache.fetch(`https://blockchain.info/balance?active=${this.addresses}&cors=true`));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static getFinalBalance(response: any) {
        const result = { finalBalance: Number.NaN, transactionCount: 0 };

        if (this.hasStringIndexer(response)) {
            for (const address in response) {
                if (response.hasOwnProperty(address)) {
                    const balance = response[address];

                    if (this.isSummary(balance)) {
                        result.transactionCount += balance.n_tx;
                        result.finalBalance = (Number.isNaN(result.finalBalance) ? 0 : result.finalBalance) +
                            balance.final_balance / 100000000;
                    }
                }
            }
        }

        return result;
    }

    private static isSummary(value: any): value is ISummary {
        return this.hasStringIndexer(value) && (typeof value.final_balance === "number") &&
            (typeof value.n_tx === "number");
    }

    private static hasStringIndexer(value: any): value is { [key: string]: any } {
        return value instanceof Object;
    }

    private readonly addresses: string;
}