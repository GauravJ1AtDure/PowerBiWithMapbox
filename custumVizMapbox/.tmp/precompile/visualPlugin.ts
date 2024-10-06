import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var custumVizMapboxC0FF6AF78C124F308865FE422B5986E3_DEBUG: IVisualPlugin = {
    name: 'custumVizMapboxC0FF6AF78C124F308865FE422B5986E3_DEBUG',
    displayName: 'custumVizMapbox',
    class: 'Visual',
    apiVersion: '5.3.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["custumVizMapboxC0FF6AF78C124F308865FE422B5986E3_DEBUG"] = custumVizMapboxC0FF6AF78C124F308865FE422B5986E3_DEBUG;
}
export default custumVizMapboxC0FF6AF78C124F308865FE422B5986E3_DEBUG;