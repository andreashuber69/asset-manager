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

import { ModelParser } from "./ModelParser";

class BlobUtility {
    public static toArrayBuffer(blob: Blob) {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject("Unable to read blob.");
            reader.readAsArrayBuffer(blob);
        });
    }
}

const loadTestFile = async (name: string) => {
    const url = `/base/src/model/ModelParser.spec/${name}`;
    let response: Response;

    try {
        response = await window.fetch(url);
    } catch (e) {
        throw new Error(`Network Error: ${e}`);
    }

    if (!response.ok) {
        throw new Error(`Response Status: ${response.status} ${response.statusText}`);
    }

    return new TextDecoder().decode(new Uint8Array(await BlobUtility.toArrayBuffer(await response.blob())));
};

const expectError = (expectation: string, fileName: string, message: string) => {
    it(expectation, async () => {
        const json = await loadTestFile(fileName);
        expect(ModelParser.parse(json)).toEqual(message);
    });
};

describe("ModelParser.parse", () => {
    expectError("should fail to parse an empty file", "Empty.assets", "Unexpected end of JSON input");
});
