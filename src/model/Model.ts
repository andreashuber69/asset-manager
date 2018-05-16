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
import { AssetBundle } from "./AssetBundle";
import { BtcWallet } from "./BtcWallet";
import { CoinMarketCapRequest } from "./CoinMarketCapRequest";
import { IWebRequest } from "./IWebRequest";
import { QuandlRequest } from "./QuandlRequest";
import { SilverAsset } from "./SilverAsset";
import { WeightUnit } from "./WeightUnit";

export class Model implements IModel {
    public get currencies() {
        return Array.from(Model.currencyMap.keys());
    }

    public get selectedCurrency() {
        return this.selectedCurrencyImpl;
    }

    public set selectedCurrency(currency: string) {
        this.selectedCurrencyImpl = currency;
        this.onCurrencyChanged().catch((reason) => console.error(reason));
    }

    public get assets() {
        return this.bundles.reduce((result, bundle) => result.concat(bundle.assets), new Array<Asset>());
    }

    /** @internal */
    public exchangeRate: number | undefined = 1;

    /** @internal */
    public addAsset(bundle: AssetBundle) {
        this.bundles.push(bundle);
    }

    /** @internal */
    public removeAsset(asset: Asset) {
        for (const bundle of this.bundles) {
            bundle.removeAsset(asset);
        }
    }

    public replaceAsset(oldAsset: Asset, newAsset: Asset) {
        for (const bundle of this.bundles) {
            bundle.replaceAsset(oldAsset, newAsset);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static readonly currencyMap = new Map<string, IWebRequest<number>>([
        ["USD", new QuandlRequest("", false)],
        ["AUD", new QuandlRequest("boe/xudladd.json", false)],
        ["CAD", new QuandlRequest("boe/xudlcdd.json", false)],
        ["CNY", new QuandlRequest("boe/xudlbk73.json", false)],
        ["CHF", new QuandlRequest("boe/xudlsfd.json", false)],
        ["CZK", new QuandlRequest("boe/xudlbk27.json", false)],
        ["DKK", new QuandlRequest("boe/xudldkd.json", false)],
        ["GBP", new QuandlRequest("boe/xudlgbd.json", false)],
        ["HKD", new QuandlRequest("boe/xudlhdd.json", false)],
        ["HUF", new QuandlRequest("boe/xudlbk35.json", false)],
        ["INR", new QuandlRequest("boe/xudlbk64.json", false)],
        ["JPY", new QuandlRequest("boe/xudljyd.json", false)],
        ["KRW", new QuandlRequest("boe/xudlbk74.json", false)],
        ["LTL", new QuandlRequest("boe/xudlbk38.json", false)],
        ["MYR", new QuandlRequest("boe/xudlbk66.json", false)],
        ["NIS", new QuandlRequest("boe/xudlbk65.json", false)],
        ["NOK", new QuandlRequest("boe/xudlnkd.json", false)],
        ["NZD", new QuandlRequest("boe/xudlndd.json", false)],
        ["PLN", new QuandlRequest("boe/xudlbk49.json", false)],
        ["RUB", new QuandlRequest("boe/xudlbk69.json", false)],
        ["SAR", new QuandlRequest("boe/xudlsrd.json", false)],
        ["SEK", new QuandlRequest("boe/xudlskd.json", false)],
        ["SGD", new QuandlRequest("boe/xudlsgd.json", false)],
        ["THB", new QuandlRequest("boe/xudlbk72.json", false)],
        ["TRY", new QuandlRequest("boe/xudlbk75.json", false)],
        ["TWD", new QuandlRequest("boe/xudltwd.json", false)],
        ["ZAR", new QuandlRequest("boe/xudlzrd.json", false)],
        ["XAG", new QuandlRequest("lbma/silver.json", true)],
        ["XAU", new QuandlRequest("lbma/gold.json", true)],
        ["BTC", new CoinMarketCapRequest("bitcoin", true)],
    ]);

    // tslint:disable-next-line:max-line-length
    private static readonly address = "1F8i3SE7Zorf6F2rLh3Mxg4Mb8aHT2nkQf";

    private readonly bundles = [
        new AssetBundle(new SilverAsset(this.getProperties("5 CHF, Roll of 50", "Home", 750, 0.835, 1))),
        new AssetBundle(new SilverAsset(this.getProperties("2 CHF, Roll of 50", "Home", 500, 0.835, 2))),
        new AssetBundle(new SilverAsset(this.getProperties("1 CHF, Roll of 50", "Home", 250, 0.835, 3))),
        new AssetBundle(new SilverAsset(this.getProperties("0.5 CHF, Roll of 50", "Home", 125, 0.835, 4))),
        new AssetBundle(new BtcWallet({
            address: Model.address,
            description: "Spending Wallet",
            location: "Mobile Phone",
            parent: this,
            quantity: undefined,
        })),
    ];

    private selectedCurrencyImpl = Model.currencyMap.keys().next().value;

    private async onCurrencyChanged() {
        this.exchangeRate = undefined;
        const request = Model.currencyMap.get(this.selectedCurrency) as IWebRequest<number>;
        this.exchangeRate = await request.execute();
    }

    private getProperties(descr: string, loc: string, weightInGrams: number, fine: number, quant: number) {
        return {
            address: Model.address,
            description: descr,
            fineness: fine,
            location: loc,
            parent: this,
            quantity: quant,
            weight: weightInGrams,
            weightUnit: WeightUnit.Gram,
        };
    }
}
