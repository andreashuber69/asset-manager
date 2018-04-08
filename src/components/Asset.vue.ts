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

import { Component, Prop, Vue } from "vue-property-decorator";
import { AssetInfo } from "./AssetInfo";
import { Currency, Value } from "./Value";

// tslint:disable-next-line:no-unsafe-any
@Component
// tslint:disable-next-line:no-default-export no-unsafe-any
export default class Asset extends Vue {
    @Prop()
    public info: AssetInfo | undefined;

    public get shortLocation() {
        if (!this.info) {
            return "";
        }

        const maxLength = 15;
        const location = this.info.location;

        return location.length > maxLength ? `${location.substr(0, maxLength)}...` : location;
    }

    public get formattedQuantity() {
        return !(this.info && this.value) ? "" : this.value.quantity.toFixed(this.info.quantityDecimals);
    }

    public get formattedValue() {
        if (!this.value) {
            return "";
        }

        const value = this.value.value.toFixed(Asset.getValueDecimals(this.value.valueCurrency));
        const currency = Currency[this.value.valueCurrency];

        return `${value} ${currency}`;
    }

    public mounted() {
        // TODO: This could possibly be done more elegantly with this.$nextTick
        setTimeout(() => this.delayedUpdate(), 1000);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static getValueDecimals(currency: Currency) {
        switch (currency) {
            case Currency.BTC:
                return 8;
            case Currency.USD:
                return 2;
            default:
                return 0;
        }
    }

    // tslint:disable-next-line:no-null-keyword
    private value: Value | null = null;

    private async delayedUpdate() {
        if (this.info) {
            this.value = await this.info.getValue();
        }
    }
}
