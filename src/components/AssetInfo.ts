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

/** Base of all classes that provide information about an asset. */
export abstract class AssetInfo {
    public get shortLocation() {
        const maxLength = 15;

        return this.location.length > maxLength ? `${this.location.substr(0, maxLength)}...` : this.location;
    }

    public get formattedQuantity() {
        return AssetInfo.formatNumber(this.quantity, this.quantityDecimals);
    }

    public get formattedTotalValue() {
        const result = (this.quantity === undefined) || (this.unitValue === undefined) ?
            undefined : this.quantity * this.unitValue;

        return AssetInfo.formatNumber(result, 2);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** @internal  */
    public get queries() {
        return this.getQueries();
    }

    /** @internal */
    public processCurrentQueryResponse(response: string) {
        return this.processQueryResponse(response);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    protected unitValue: number | undefined = undefined;

    /**
     * Creates a new [[AssetInfo]] instance.
     * @param location The location of the asset, e.g. Saftey Deposit Box. For a crypto currency, this is the public
     * address.
     * @param description Describes the asset, e.g. Spending, Savings, Bars, Coins.
     * @param type The type of asset, e.g. Silver, Gold, BTC.
     * @param unit The unit of the quantity, e.g. 1 oz (troy), 10 g, BTC.
     * @param quantity The asset quantity.
     * @param quantityDecimals The number of decimals to use to format the quantity.
     */
    protected constructor(
        public readonly location: string,
        public readonly description: string,
        public readonly type: string,
        public readonly unit: string,
        protected quantity: number | undefined,
        private readonly quantityDecimals: number,
    ) {
    }

    /**
     * Gets a collection of HTTP GET queries that need to be executed in order to value and optionally quantify the
     * asset.
     * @description This method can be overridden more than once. A good example for this practice can be found in
     * [[CryptoAssetInfo]] and [[BtcInfo]]. The former is the base class of the latter and both override this method.
     * [[CryptoAssetInfo]] issues a query for the price and [[BtcInfo]] makes (possibly muultiple) queries for the
     * balance of a given address or xpub. For everything to work as expected, [[BtcInfo]] must pass through the query
     * of the [[CryptoAssetInfo]] implementation, e.g. by having `yield * super.getQueries();` as the very first
     * statement of its own `getQueries()` implementation. Of course, a similar implementation strategy must be used to
     * process the responses to the requests, see [[processQueryResponse]] for more information.
     * @returns An iterator that points to before the first query, call `next()` to get the first query.
     */
    protected abstract getQueries(): IterableIterator<string>;

    /**
     * Processes the response to the query that the iterator returned by [[getQueries]] currently points to.
     * Is called exactly once for each of the queries.
     * @description This method can be overridden more than once. A good example for this practice can be found in
     * [[CryptoAssetInfo]] and [[BtcInfo]]. The former is the base class of the latter and both override this method.
     * [[CryptoAssetInfo]] processes the response to the price query and [[BtcInfo]] processes the responses to the
     * balance queries. For everything to work as expected, the [[BtcInfo]] override must pass through the response
     * meant for the [[CryptoAssetInfo]] override, by calling `super.processQueryResponse(response);` first
     * and then only process a response if the base class implementation returned `true`.
     * @returns `false` if the base class implementation was responsible to process the response; otherwise, `true`.
     */
    protected abstract processQueryResponse(response: string): boolean;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static formatNumber(num: number | undefined, decimals: number) {
        if (num === undefined) {
            return "Querying...";
        } else if (Number.isNaN(num)) {
            return "Error";
        } else {
            return num.toFixed(decimals);
        }
    }
}
