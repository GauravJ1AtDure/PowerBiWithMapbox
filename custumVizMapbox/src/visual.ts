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
let Maplat:number = 22
let long:number = 79
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

      //  console.log('Visual styleUrlLink', styleUrlLink);

      

      

        
        if (document) {

            if (!mapboxgl.supported()) {
                alert('Your browser does not support Mapbox GL');
            } 
            else{
            this.initializeMap();
            }
        }
            
    }

    

    private initializeMap() {
        this.map = new mapboxgl.Map({
            container: this.target,
            style: 'mapbox://styles/mapbox/standard',
            center: [79, 22], // Default center
            zoom: 1, // Default zoom level
            projection: 'mercator',
        })

       
    }
   

    public update(options: VisualUpdateOptions) {
      this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

        console.log('Visual update', options);
        
        const dataView = options.dataViews[0];
        const locations = dataView.categorical.categories[0].values
        const latitudesData = dataView.categorical.values[0].values
        const longitudesData = dataView.categorical.values[1].values
        const mapData = dataView.categorical.values[2].values
        const markerColors = dataView.categorical.values[3].values

        let style_Url = dataView.metadata.objects.directEdit.styleUrl
        let projection = dataView.metadata.objects.directEdit.projection
        let centerLat= dataView.metadata.objects.directEdit.centerLat
        let centerLong= dataView.metadata.objects.directEdit.centerLong
        let zoomlevel = dataView.metadata.objects.directEdit.zoomLevel
        let geojsonLink = dataView.metadata.objects.directEdit.geojsonLink
       // const points = dataView.table.rows;
       
       console.log('directEdit', dataView.metadata.objects.directEdit)
       
       console.log('locations', locations)
       console.log('latitudesData', latitudesData)
       console.log('longitudesData', longitudesData)
       console.log('mapData', mapData)
       console.log('markerColors', markerColors)
        // Add markers to the map
       let styleUrlLinkString: string = style_Url as string;
       let mapProjection: string = projection as string;
       let centerLatNumber: number = centerLat as number;
       let centerLongNumber: number = centerLong as number;
       let zoomLevelNumber: number = zoomlevel as number;
       let geoJsonLnk: string = geojsonLink as string;

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

   

   for (let x = 0; x < locations.length; x++) {
    let lat:number=latitudesData[x] as number;
    let lng:number=longitudesData[x] as number;
    let marker_colors:string=markerColors[x] as string;
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(''+locations[x]+'-'+mapData[x]+' ')
 
    const marker1=new mapboxgl.Marker({color: marker_colors})
    .setLngLat([lng,lat])
    .setPopup(popup)
    .addTo(this.map);

   }


   this.map.on('load', () => {
    // Add a source for the state polygons.
    this.map.addSource('state', {
        'type': 'geojson',
       // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
        //'data': 'https://raw.githubusercontent.com/adarshbiradar/maps-geojson/refs/heads/master/india.json'
        'data': geoJsonLnk
    });

    // Add a layer showing the state polygons.
    this.map.addLayer({
        'id': 'states-layer',
        'type': 'fill',
        'source': 'state',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
});
 
        
}

    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}