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

export const currencyNames = [
    "USD",
    "AUD",
    "CAD",
    "CNY",
    "CHF",
    "CZK",
    "DKK",
    "GBP",
    "HKD",
    "HUF",
    "INR",
    "JPY",
    "KRW",
    "LTL",
    "MYR",
    "NIS",
    "NOK",
    "NZD",
    "PLN",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "ZAR",
    "XAG",
    "XAU",
    "BTC",
] as const;

export type CurrencyName = typeof currencyNames[number];
