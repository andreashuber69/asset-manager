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

import { AssetInfo } from "./AssetInfo";

export class PreciousMetalInfo extends AssetInfo {
    public constructor(
        key: number,
        label: string,
        type: string,
        location: string,
        denomination: string,
        public readonly amount: number) {
        super(key, label, type, location, denomination);
    }

    public async update(): Promise<void> {
        this.amount.toString();
    }
}
