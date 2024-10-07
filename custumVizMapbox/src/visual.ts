/*
*  Power BI Visual CLI
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
//import * as powerbi from "powerbi-visuals-api";
import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";
import * as d3 from "d3";
import mapboxgl, { Marker } from 'mapbox-gl';   
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.js";
//import "core-js/stable";
//import "regenerator-runtime/runtime";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import { VisualFormattingSettingsModel } from "./settings";

let styleUrlLink:string = 'mapbox://styles/mapbox/streets-v9'
let map_projection:string = 'mercator'
let Maplat:number = 22.248110852414744
let long:number = 79.19163260780998
let zoomlvl:number = 1

export class Visual implements IVisual {
    private target: HTMLElement;
    private map: mapboxgl.Map;
    private accessToken: string = "pk.eyJ1IjoiZ2F1cmF2amR1cmUxMiIsImEiOiJjbTF1OHdhYmkwOHQzMm1zYnRtY3llaG01In0.w3O1zQJxaicKsUrJZoB4Lw";
    private host: IVisualHost;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
     

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        mapboxgl.accessToken = this.accessToken;
        this.host = options.host;

        this.map = new mapboxgl.Map({
            container: this.target,
            style: styleUrlLink,
            center: [long, Maplat], // Default center
            zoom: zoomlvl, // Default zoom level
            projection: map_projection,
        })

       

        
      /*  if (document) {

            if (!mapboxgl.supported()) {
                alert('Your browser does not support Mapbox GL');
            } 
            else{
            this.initializeMap();
            }
        }
            */
    }

    
/*
    private initializeMap() {
        this.map = new mapboxgl.Map({
            container: this.target,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [12.550343, 55.665957], // Default center
            zoom: 9, // Default zoom level
            //projection: 'globe',
        });

        const marker1=new mapboxgl.Marker()
        .setLngLat([12.554729, 55.70651])
        .addTo(this.map);
    }
   */ 

    public update(options: VisualUpdateOptions) {
      this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

        console.log('Visual update', options);
        
        const dataView = options.dataViews[0];
        let style_Url = dataView.metadata.objects.directEdit.styleUrl
        let projection = dataView.metadata.objects.directEdit.projection
        let centerLat= dataView.metadata.objects.directEdit.centerLat
        let centerLong= dataView.metadata.objects.directEdit.centerLong
        let zoomlevel = dataView.metadata.objects.directEdit.zoomLevel
       // const points = dataView.table.rows;
       
       console.log('styleUrl', dataView.metadata.objects.directEdit)
       
       console.log('styleUrlglobalid', this.map.style.globalId)
        // Add markers to the map

      //  this.map.style.globalId = style_Url

          

       let styleUrlLinkString: string = style_Url as string;
       let mapProjection: string = projection as string;
       let centerLatNumber: number = centerLat as number;
       let centerLongNumber: number = centerLong as number;
       let zoomLevelNumber: number = zoomlevel as number;

       styleUrlLink = styleUrlLinkString
       Maplat = centerLatNumber
       long = centerLongNumber
       map_projection=mapProjection
       zoomlvl = zoomLevelNumber
       
       this.map = new mapboxgl.Map({
        container: this.target,
        style: styleUrlLink,
        center: [long, Maplat],
        zoom: zoomlvl,
        projection:map_projection
   })
       
            //const lng = Number(point[0]); // Convert to number
            //const lat = Number(point[1]); // Convert to number
            
            const lng = Number(55.70651);
            const lat = Number(12.554729);

            const marker1=new mapboxgl.Marker()
            .setLngLat([12.554729, 55.70651])
            .addTo(this.map);
        
    }

    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}