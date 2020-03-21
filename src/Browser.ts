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

import { UAParser } from "ua-parser-js";

export class Browser {
    public static get isCompatible() {
        const { browserName, browserVersion, engineName, engineVersion } = Browser.getInfo();

        if ((browserName === "Firefox") && (browserVersion < 47)) {
            return false;
        }

        if (((browserName === "Mobile Safari") || (browserName === "Safari")) && (browserVersion < 10)) {
            return false;
        }

        if ((browserName === "IE") || (browserName === "IEMobile")) {
            return false;
        }

        // The Blink engine is used by Chrome, Chromium and other Chromium-based browsers (like Opera and Yandex), all
        // of which have a Chrome version in their userAgent string
        if ((engineName === "Blink") && (engineVersion < 58)) {
            return false;
        }

        return true;
    }


    private static getInfo() {
        const uaParser = new UAParser();
        const { browser, engine } = uaParser.getResult();

        return {
            browserName: browser.name,
            browserVersion: Browser.getMajorVersion(browser.version),
            engineName: engine.name,
            engineVersion: Browser.getMajorVersion(engine.version),
        };
    }

    private static getMajorVersion(str: string | undefined) {
        const parsed = Number.parseInt(str ?? "", 10);

        return Number.isNaN(parsed) ? 0 : parsed;
    }
}
