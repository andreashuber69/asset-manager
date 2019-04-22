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

// TODO: multipleOf does not work correctly with ajv, we probably need to go back to the old validation logic
/** Defines valid values for the precious metal fineness, e.g. 0.999.
 * @minimum 0.5
 * @exclusiveMaximum 1
 * @multipleOf 0.000001
 */
export type Fineness = number;
