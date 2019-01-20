// tslint:disable:file-name-casing
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

// tslint:disable-next-line:no-submodule-imports ordered-imports
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import Vue from "vue";
// tslint:disable-next-line:no-import-side-effect
import "./plugins/vuetify";
// tslint:disable-next-line:no-default-import ordered-imports
import App from "./App.vue";
// tslint:disable-next-line:ordered-imports no-import-side-effect no-submodule-imports
import "roboto-fontface/css/roboto/roboto-fontface.css";
// tslint:disable-next-line:no-import-side-effect
import "./assets/material-icons.css";

OfflinePluginRuntime.install();
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
