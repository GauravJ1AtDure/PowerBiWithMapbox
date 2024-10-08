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

import TextInput = formattingSettings.TextInput;
import TextArea = formattingSettings.TextArea;
import NumUpDown = formattingSettings.NumUpDown;
import ItemDropdown = formattingSettings.ItemDropdown;

/**
 * Data Point Formatting Card
 */

class DirectEditSettings extends FormattingSettingsCard {
    displayName = 'Direct Edit';
    private lat: number=1;
    private long: number=2;
    name = 'directEdit';
    //private minFontSize: number = 8;
    //private defaultFontSize: number = 11;
    //topLevelSlice = this.show;
    styleUrl = new formattingSettings.ItemDropdown({
        name: 'styleUrl',
        items: [{ displayName: 'standard', value: 'mapbox://styles/mapbox/standard' },
            { displayName: 'standard-satellite', value: 'mapbox://styles/mapbox/standard-satellite' },
            { displayName: 'streets-v12', value: 'mapbox://styles/mapbox/streets-v12' },
            { displayName: 'outdoors-v12', value: 'mapbox://styles/mapbox/outdoors-v12' },
            { displayName: 'light-v11', value: 'mapbox://styles/mapbox/light-v11' },
            { displayName: 'dark-v11', value: 'mapbox://styles/mapbox/dark-v11' },
            { displayName: 'satellite-v9', value: 'mapbox://styles/mapbox/satellite-v9' },
            { displayName: 'satellite-streets-v12', value: 'mapbox://styles/mapbox/satellite-streets-v12' },
            { displayName: 'navigation-day-v1', value: 'mapbox://styles/mapbox/navigation-day-v1' },
            { displayName: 'navigation-night-v1', value: 'mapbox://styles/mapbox/navigation-night-v1' }],
        value: { displayName: '', value: '' }
    });
    projection = new formattingSettings.ItemDropdown({
        name: 'projection',
        items: [{ displayName: 'mercator', value: 'mercator' },{ displayName: 'globe', value: 'globe' }],
        value: { displayName: '', value: '' }
    });
    centerLat = new formattingSettings.NumUpDown({
        name: "centerLat",
        displayName: "Center Lat",
        value:null,
    });
    centerLong = new formattingSettings.NumUpDown({
        name: "centerLong",
        displayName: "Center Long",
        value:null
    });
    zoomLevel = new formattingSettings.NumUpDown({
        name: "zoomLevel",
        displayName: "Zoom Level",
        value:null
    });
    geojsonLink = new formattingSettings.TextInput({
        name: "geojsonLink",
        displayName: "Geojson Link",
        value:'',
        placeholder:'link of the geojson'
    })
   // topLevelSlice = this.textProperty;
    slices = [this.styleUrl, this.projection ,this.centerLat, this.centerLong, this.zoomLevel, this.geojsonLink]
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
    cards = [this.dataPointCard ,this.directEditSettings];
}
