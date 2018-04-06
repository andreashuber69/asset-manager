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

    // tslint:disable-next-line:no-null-keyword
    public value: Value | null = null;

    public get shortLocation() {
        if (!this.info) {
            return "";
        }

        const maxLength = 15;
        const location = this.info.location;

        return location.length > maxLength ? `${location.substr(0, maxLength)}...` : location;
    }

    public get formattedQuantity() {
        return !this.info || !this.value || Number.isNaN(this.value.quantity) ? "" :
            `${this.value.quantity.toFixed(this.info.quantityDecimals)} ${this.info.quantityDenomination}`;
    }

    public get formattedValue() {
        return !this.info || !this.value || Number.isNaN(this.value.value) ? "" :
            `${this.value.value.toFixed(this.info.quantityDecimals)} ${Currency[this.value.valueCurrency]}`;
    }

    public mounted() {
        // TODO: This could possibly be done more elegantly with this.$nextTick
        setTimeout(() => this.delayedUpdate(), 1000);
    }

    private async delayedUpdate() {
        if (this.info) {
            this.value = await this.info.getValue();
        }
    }
}