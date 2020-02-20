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

import { Component, Vue } from "vue-property-decorator";

import { TextInputInfo } from "../model/TextInputInfo";

// tslint:disable-next-line:no-default-import
import TextField from "./TextField.vue";

@Component({ components: { TextField } })
/** Implements the dialog used during Save As... */
// eslint-disable-next-line import/no-default-export
export default class SaveAsDialog extends Vue {
    public name = "";

    public isOpen = false;

    /** Provides the name input information. */
    public readonly nameInfo = new TextInputInfo({
        label: "Name", hint: "The name of the file.", isPresent: true, isRequired: true, schemaName: "Text",
    });

    public onSaveClicked(event: MouseEvent) {
        if (this.isValid()) {
            this.close(this.name);
        }
    }

    public onCancelClicked(event: MouseEvent) {
        this.close(undefined);
    }

    public showDialog(name: string) {
        this.name = name;
        this.isOpen = true;

        return new Promise<string | undefined>((resolve) => this.resolve = resolve);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private resolve?: (value: string | undefined) => void;

    private isValid() {
        // tslint:disable-next-line:no-unsafe-any
        return (this.$refs.form as any).validate();
    }

    private close(value: string | undefined) {
        this.isOpen = false;

        if (!this.resolve) {
            throw new Error("No resolve callback set!");
        }

        this.resolve(value);
    }
}
