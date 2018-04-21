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

// tslint:disable-next-line:no-unnecessary-class
export class QueryCache {
    public static async fetch(query: string) {
        let result = this.cache.get(query);

        if (!result) {
            result = await (await window.fetch(query)).text();
            this.cache.set(query, result);
        }

        return result;
    }

    private static readonly cache = new Map<string, string>();
}
