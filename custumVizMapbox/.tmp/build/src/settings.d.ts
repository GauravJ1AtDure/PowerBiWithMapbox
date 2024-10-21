import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
/**
 * Data Point Formatting Card
 */
declare class DirectEditSettings extends FormattingSettingsCard {
    displayName: string;
    private lat;
    private long;
    name: string;
    showMarkers: formattingSettings.ToggleSwitch;
    styleUrl: formattingSettings.ItemDropdown;
    projection: formattingSettings.ItemDropdown;
    centerLat: formattingSettings.NumUpDown;
    centerLong: formattingSettings.NumUpDown;
    zoomLevel: formattingSettings.NumUpDown;
    slices: (formattingSettings.NumUpDown | formattingSettings.ToggleSwitch | formattingSettings.ItemDropdown)[];
}
declare class MapSettings extends FormattingSettingsCard {
    displayName: string;
    name: string;
    geojsonLink: formattingSettings.TextArea;
    infoOnClick: formattingSettings.TextInput;
    slices: formattingSettings.TextInput[];
}
declare class ChoroplethSettings extends FormattingSettingsCard {
    displayName: string;
    name: string;
    dataKey: formattingSettings.TextInput;
    range1Value: formattingSettings.NumUpDown;
    range1Color: formattingSettings.TextInput;
    range2Value: formattingSettings.NumUpDown;
    range2Color: formattingSettings.TextInput;
    range3Value: formattingSettings.NumUpDown;
    range3Color: formattingSettings.TextInput;
    range4Value: formattingSettings.NumUpDown;
    range4Color: formattingSettings.TextInput;
    range5Value: formattingSettings.NumUpDown;
    range5Color: formattingSettings.TextInput;
    slices: (formattingSettings.TextInput | formattingSettings.NumUpDown)[];
}
declare class RadarSettings extends FormattingSettingsCard {
    displayName: string;
    name: string;
    radarUrl: formattingSettings.TextInput;
    radarLat_1: formattingSettings.NumUpDown;
    radarLong_1: formattingSettings.NumUpDown;
    radarLat_2: formattingSettings.NumUpDown;
    radarLong_2: formattingSettings.NumUpDown;
    slices: (formattingSettings.TextInput | formattingSettings.NumUpDown)[];
}
declare class DataPointCardSettings extends FormattingSettingsCard {
    defaultColor: formattingSettings.ColorPicker;
    showAllDataPoints: formattingSettings.ToggleSwitch;
    fill: formattingSettings.ColorPicker;
    fillRule: formattingSettings.ColorPicker;
    fontSize: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
/**
* visual settings model class
*
*/
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    dataPointCard: DataPointCardSettings;
    directEditSettings: DirectEditSettings;
    mapSettings: MapSettings;
    choroplethSettings: ChoroplethSettings;
    radarSettings: RadarSettings;
    cards: (DataPointCardSettings | DirectEditSettings | MapSettings | ChoroplethSettings | RadarSettings)[];
}
export {};
