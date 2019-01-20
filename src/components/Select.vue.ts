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

import { Component, Prop } from "vue-property-decorator";
import { SelectInputInfo, SelectInputInfoBase } from "../model/SelectInputInfo";
import { ControlBase } from "./ControlBase";

@Component
/** Implements a select control that simplifies common functionality like e.g. validation. */
// tslint:disable-next-line:no-default-export
export default class Select extends ControlBase<SelectInputInfoBase> {
    @Prop()
    public large?: boolean;

    public get items() {
        return this.primitiveInputInfo.items;
    }

    /**
     * @description This redundant method is only necessary because a method called from a template apparently needs to
     * be a member of the class associated with the template.
     */
    public validate() {
        return super.validate();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    protected get primitiveInputInfo(): SelectInputInfoBase {
        return this.checkedInfo.get(SelectInputInfo, this.property);
    }
}
