/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import TextArea = formattingSettings.TextArea;
/**
 * Data Point Formatting Card
 */

class DirectEditSettings extends FormattingSettingsCard {
    displayName = 'Direct Edit';
    private lat: number = 22.248110852414744;
    private long: number = 79.19163260780998;
    name = 'directEdit';
    //private minFontSize: number = 8;
    //private defaultFontSize: number = 11;
    //topLevelSlice = this.show;
    styleUrl = new formattingSettings.TextArea({
        displayName: "Style URL",
        name: "styleUrl",
        value: " ",
        placeholder: "Add style url"
    });
    projection = new formattingSettings.ItemDropdown({
        name: 'projection',
        items: [{ displayName: 'mercator', value: 'mercator' },{ displayName: 'globe', value: 'globe' }, { displayName: 'naturalEarth', value: 'naturalEarth' }, { displayName: 'winkelTripel', value: 'winkelTripel' }, { displayName: 'equalEarth', value: 'equalEarth' }, { displayName: 'equirectangular', value: 'equirectangular' }, { displayName: 'lambertConformalConic', value: 'lambertConformalConic' }],
        value: { displayName: 'mercator', value: 'mercator' }
    });
    centerLat = new formattingSettings.NumUpDown({
        displayName: "Center Lat",
        name: "centerLat",
        value: this.lat
    });
    centerLong = new formattingSettings.NumUpDown({
        displayName: "Center Long",
        name: "centerLong",
        value:this.long
    });
    zoomLevel = new formattingSettings.NumUpDown({
        name: "zoomLevel",
        displayName: "Zoom Level",
        value: 1
    })
   // topLevelSlice = this.textProperty;
    slices = [this.styleUrl, this.projection ,this.centerLat, this.centerLong, this.zoomLevel]
}
class DataPointCardSettings extends FormattingSettingsCard {
    defaultColor = new formattingSettings.ColorPicker({
        name: "defaultColor",
        displayName: "Default color",
        value: { value: "" }
    });

    showAllDataPoints = new formattingSettings.ToggleSwitch({
        name: "showAllDataPoints",
        displayName: "Show all",
        value: true
    });

    fill = new formattingSettings.ColorPicker({
        name: "fill",
        displayName: "Fill",
        value: { value: "" }
    });

    fillRule = new formattingSettings.ColorPicker({
        name: "fillRule",
        displayName: "Color saturation",
        value: { value: "" }
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Text Size",
        value: 12
    });

    name: string = "dataPoint";
    displayName: string = "Data colors";
    slices: Array<FormattingSettingsSlice> = [this.defaultColor, this.showAllDataPoints, this.fill, this.fillRule, this.fontSize];
}

/**
* visual settings model class
*
*/
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    // Create formatting settings model formatting cards
    dataPointCard = new DataPointCardSettings();
    directEditSettings = new DirectEditSettings();
    cards = [this.dataPointCard, this.directEditSettings];
}