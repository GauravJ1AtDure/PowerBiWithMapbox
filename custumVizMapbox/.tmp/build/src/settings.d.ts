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
    styleUrl: formattingSettings.ItemDropdown;
    projection: formattingSettings.ItemDropdown;
    centerLat: formattingSettings.NumUpDown;
    centerLong: formattingSettings.NumUpDown;
    zoomLevel: formattingSettings.NumUpDown;
    slices: (formattingSettings.ItemDropdown | formattingSettings.NumUpDown)[];
}
declare class MapSettings extends FormattingSettingsCard {
    displayName: string;
    name: string;
    geojsonLink: formattingSettings.TextArea;
    slices: formattingSettings.TextArea[];
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
    cards: (DataPointCardSettings | DirectEditSettings | MapSettings)[];
}
export {};
