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

import { Component } from "vue-property-decorator";
import { ControlBase } from "./ControlBase";
import { TextFieldInfo } from "./TextFieldInfo";

// tslint:disable-next-line:no-unsafe-any
@Component
/** Provides a text field control that simplifies common functionality like e.g. validation. */
// tslint:disable-next-line:no-default-export
export default class TextField extends ControlBase<TextFieldInfo> {
    /**
     * @description This redundant method is only necessary because a method called from a template apparently needs to
     * be a member of the class associated with the template.
     */
    public validate() {
        return super.validate();
    }
}
