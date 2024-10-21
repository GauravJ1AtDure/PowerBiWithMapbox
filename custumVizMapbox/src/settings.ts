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
    showMarkers = new formattingSettings.ToggleSwitch({
        name: 'showMarkers',
        displayName: "Show markers",
        value: true
    })
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
    
   // topLevelSlice = this.textProperty;
    slices = [this.showMarkers, this.styleUrl, this.projection ,this.centerLat, this.centerLong, this.zoomLevel]
}

class MapSettings extends FormattingSettingsCard {
    displayName = 'Map Edits';
    name = 'mapEdits';
    geojsonLink = new formattingSettings.TextArea({
        name: "geojsonLink",
        displayName: "Geojson Link",
        value:'',
        placeholder:'link of the geojson'
    })
    infoOnClick = new formattingSettings.TextInput({
        name: "infoOnClick",
        displayName: "Data key for info",
        value:'',
        placeholder:'Set data key for info'
    })
   
    slices= [this.geojsonLink, this.infoOnClick]
}

class ChoroplethSettings extends FormattingSettingsCard {
    displayName = 'Choropleth Range';
    name = 'choroplethRange';
    dataKey = new formattingSettings.TextInput({
        name: "dataKey",
        displayName: "Data Key",
        value:'',
        placeholder:'Set data key'
    })
    range1Value = new formattingSettings.NumUpDown({
        name: "range1Value",
        displayName: "1st Range Value",
        value:null,
    })
    range1Color = new formattingSettings.TextInput({
        name: "range1Color",
        displayName: "1st Range Color",
        value:'',
        placeholder:'set color'
    })
    range2Value = new formattingSettings.NumUpDown({
        name: "range2Value",
        displayName: "2nd Range Value",
        value:null,
    })
    range2Color = new formattingSettings.TextInput({
        name: "range2Color",
        displayName: "2nd Range Color",
        value:'',
        placeholder:'set color'
    })
    range3Value = new formattingSettings.NumUpDown({
        name: "range3Value",
        displayName: "3rd Range Value",
        value:null,
    })
    range3Color = new formattingSettings.TextInput({
        name: "range3Color",
        displayName: "3rd Range Color",
        value:'',
        placeholder:'set color'
    })
    range4Value = new formattingSettings.NumUpDown({
        name: "range4Value",
        displayName: "4th Range Value",
        value:null,
    })
    range4Color = new formattingSettings.TextInput({
        name: "range4Color",
        displayName: "4th Range Color",
        value:'',
        placeholder:'set color'
    })
    range5Value = new formattingSettings.NumUpDown({
        name: "range5Value",
        displayName: "5th Range Value",
        value:null,
    })
    range5Color = new formattingSettings.TextInput({
        name: "range5Color",
        displayName: "5th Range Color",
        value:'',
        placeholder:'set color'
    })
   
    slices= [this.dataKey, this.range1Value, this.range1Color, this.range2Value, this.range2Color, this.range3Value, this.range3Color, this.range4Value, this.range4Color, this.range5Value, this.range5Color]
}

class RadarSettings extends FormattingSettingsCard {
    displayName = 'Radar Settings';
    name = 'radarSettings';
    radarUrl = new formattingSettings.TextInput({
        name: "radarUrl",
        displayName: "radarUrl",
        value: '',
        placeholder:'input radar url'
    });
    radarLat_1 = new formattingSettings.NumUpDown({
        name: "radarLat_1",
        displayName: "Radar Lat 1",
        value: null,
    });
    radarLong_1 = new formattingSettings.NumUpDown({
        name: "radarLong_1",
        displayName: "Radar Long 1",
        value: null,
    });
    radarLat_2 = new formattingSettings.NumUpDown({
        name: "radarLat_2",
        displayName: "Radar Lat 2",
        value: null,
    });
    radarLong_2 = new formattingSettings.NumUpDown({
        name: "radarLong_2",
        displayName: "Radar Long 2",
        value: null,
    });
    
    slices= [this.radarUrl, this.radarLat_1, this.radarLong_1, this.radarLat_2, this.radarLong_2]
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
    mapSettings = new MapSettings();
    choroplethSettings = new ChoroplethSettings();
    radarSettings = new RadarSettings();
    cards = [this.dataPointCard ,this.directEditSettings, this.mapSettings, this.choroplethSettings, this.radarSettings];
}
