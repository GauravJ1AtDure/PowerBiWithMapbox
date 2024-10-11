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

var dataView

var locations:string[] = ['']
var latitudesData:number[] = [-71]
var longitudesData:number[] = [52]
var mapData:number[] = [0]
var markerColors:string[] = ['transparent']

var directEdit = { 'style_Url': 'mapbox://styles/mapbox/standard', 'projection': 'mercator', 'centerLat':20, 'centerLong':-80, 'zoomlevel':1}


/*
let style_Url =  "mapbox://styles/mapbox/standard"
let projection =  "mercator"
let centerLat=  20
let centerLong=  -80
let zoomlevel =  1
let geojsonLink =  'apilink'
let infoOnClick =  'etc'
*/
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

        
        if (document) {

            if (!mapboxgl.supported()) {
                alert('Your browser does not support Mapbox GL');
            } 
            else{
            this.initializeMap();
            }
        }
            
    }

    public update(options: VisualUpdateOptions) {
      this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

        console.log('Visual update', options);

        dataView = options.dataViews[0];
        let dataViewLen = Object.keys(dataView).length
        

 
        let location=dataView.categorical.categories[0].values as typeof locations;
        let lt = dataView.categorical.values[0].values as typeof latitudesData;
        let lng = dataView.categorical.values[1].values as typeof longitudesData;
        let mapDataVal = dataView.categorical.values[2].values as typeof mapData;
        let markerCol= dataView.categorical.values[3].values as typeof markerColors;

        
        locations =  [...location];
        latitudesData = [...lt];
        longitudesData = [...lng];
        mapData = [...mapDataVal];
        markerColors = [...markerCol];

      
        var directEdit1 = dataView.metadata.objects.directEdit
        directEdit.style_Url = directEdit1.styleUrl as typeof directEdit.style_Url
        directEdit.projection = directEdit1.projection as typeof directEdit.projection
        directEdit.centerLat= directEdit1.centerLat as typeof directEdit.centerLat
        directEdit.centerLong= directEdit1.centerLong as typeof directEdit.centerLong
        directEdit.zoomlevel = directEdit1.zoomLevel as typeof directEdit.zoomlevel

        this.initializeMap()

        var mapEdits = dataView.metadata.objects.mapEdits || {'geojsonLink': 'https://raw.githubusercontent.com/GauravJ1AtDure/maps/refs/heads/main/antarctica.geojson', 'infoOnClick':'info'}
        var geojsonLink = mapEdits.geojsonLink
        var infoOnClick = mapEdits.infoOnClick

        var choroplethRange = dataView.metadata.objects.choroplethRange || {'dataKey':'dataKey', 'range1Value':1, 'range1Color':'transparent', 'range2Value': 2, 'range2Color': 'transparent', 'range3Value': 3, 'range3Color': 'transparent', 'range4Value': 4, 'range4Color':'transparent', 'range5Value':5, 'range5Color': 'transparent'}
        var dataKey = choroplethRange.dataKey
        var range1Value = choroplethRange.range1Value
        var range1Color = choroplethRange.range1Color
        var range2Value = choroplethRange.range2Value
        var range2Color = choroplethRange.range2Color
        var range3Value = choroplethRange.range3Value
        var range3Color = choroplethRange.range3Color
        var range4Value = choroplethRange.range4Value
        var range4Color = choroplethRange.range4Color
        var range5Value = choroplethRange.range5Value
        var range5Color = choroplethRange.range5Color

        var radarSettings = dataView.metadata.objects.radarSettings || {'radarUrl':'s', 'radarLat_1':0, 'radarLong_1':0, 'radarLat_2':0, 'radarLong_2':0}
        var radarUrl = radarSettings.radarUrl
        var radarLat_1 =  radarSettings.radarLat_1
        var radarLong_1 =  radarSettings.radarLong_1
        var radarLat_2 =  radarSettings.radarLat_2
        var radarLong_2 =  radarSettings.radarLong_2

       console.log('dataViewLen', dataViewLen)
       console.log('locations', locations)
       console.log('latitudesData', latitudesData)
       console.log('longitudesData', longitudesData)
       console.log('markerColors', markerColors)
       console.log('mapData', mapData)
      console.log('directEdit',directEdit)
      // console.log('mapEdits',  Object.keys(mapEdits).length)
      // console.log('choroplethRange', Object.keys(choroplethRange).length)
      // console.log('radarCoordinates',radarCoordinates)

       let geoJsonLnk: string = geojsonLink as string;
       let infoOnClck: string = infoOnClick as string;
       let radarUrl_str:string=radarUrl as string;
       let radarLt1: number = radarLat_1 as number;
       let radarLng1: number = radarLong_1 as number;
       let radarLt2: number = radarLat_2 as number;
       let radarLng2: number = radarLong_2 as number;

       
   

//    for (let x = 0; x < locations.length; x++) {
//     let lat:number=latitudesData[x] as number;
//     let lng:number=longitudesData[x] as number;
//     let marker_colors:string=markerColors[x] as string;
//     const popup = new mapboxgl.Popup({ offset: 25 }).setText(''+locations[x]+'-'+mapData[x]+' ')
 
//     const marker1=new mapboxgl.Marker({color: marker_colors})
//     .setLngLat([lng,lat])
//     .setPopup(popup)
//     .addTo(this.map);

//    }


   this.map.on('load', () => {

  /*  this.map.addSource('modis-lst', {
        'type': 'raster',
        'tiles': [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        'tileSize': 256
    });
    
    this.map.addLayer({
        'id': 'modis-lst-layer',
        'type': 'raster',
        'source': 'modis-lst',
        'paint': {}
    });
    

    this.map.addSource('radar', {
        'type': 'image',
        'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        'coordinates': [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
        ]
    });
*/

    this.map.addSource('radar', {
        'type': 'image',
        'url': radarUrl_str,
        'coordinates':  [ 
            [radarLt1, radarLng1],
            [radarLt2, radarLng1],
            [radarLt2, radarLng2],
            [radarLt1, radarLng2],
            ]
    });

    this.map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
            'raster-fade-duration': 0
        }
    });


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

    this.map.on('click', 'states-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(this.map);
    });
    
   

    this.map.addLayer({
        'id': 'choropleth',
        'type': 'fill',
        'source': 'state',
        'layout': {},
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', dataKey],
                range1Value, range1Color,
                range2Value, range2Color,
                range3Value, range3Color,
                range4Value, range4Color,
                range5Value, range5Color,
            ],
            'fill-opacity': 0.8
        }
    });

});
 
        
}


private initializeMap() {
    console.log('initializeMapdirectEdit',directEdit)
    console.log('dataView', dataView);

    this.map = new mapboxgl.Map({
        container: this.target,
        style: directEdit.style_Url,
        center: [directEdit.centerLong, directEdit.centerLat], // Default center
        zoom: directEdit.zoomlevel, // Default zoom level
        projection: directEdit.projection,
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
    
}

    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}