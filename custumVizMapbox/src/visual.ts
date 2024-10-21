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

// var locations = ['']
// var latitudesData = [-71]
// var longitudesData = [52]
// var mapData = [0]
// var markerColors= ['transparent']

var directEdit = { 'showMarkers':true, 'style_Url': 'mapbox://styles/mapbox/standard', 'projection': 'mercator', 'centerLat':20, 'centerLong':-80, 'zoomlevel':1}

var mapEdits = {'geojsonLink': 'https://raw.githubusercontent.com/GauravJ1AtDure/maps/refs/heads/main/antarctica.geojson', 'infoOnClick':'name'}

var choroplethRange = {'dataKey':'dataKey', 'range1Value':1, 'range1Color':'transparent', 'range2Value': 2, 'range2Color': 'transparent', 'range3Value': 3, 'range3Color': 'transparent', 'range4Value': 4, 'range4Color':'transparent', 'range5Value':5, 'range5Color': 'transparent'}

var radarSettings =  {'radarUrl':'s', 'radarLat_1':0, 'radarLong_1':0, 'radarLat_2':0, 'radarLong_2':0}

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


        // this.map = new mapboxgl.Map({
        //             container: this.target,
        //             style: directEdit.style_Url,
        //             center: [directEdit.centerLong, directEdit.centerLat], // Default center
        //             zoom: directEdit.zoomlevel, // Default zoom level
        //             projection: directEdit.projection,

        // })
        
        if (document) {

            if (!mapboxgl.supported()) {
                alert('Your browser does not support Mapbox GL');
            } 
            else{
            this.initializeMap();
            }
        }
            
    }


    public initializeMap(){

        this.map = new mapboxgl.Map({
            container: this.target,
            style: directEdit.style_Url,
            center: [directEdit.centerLong, directEdit.centerLat], // Default center
            zoom: directEdit.zoomlevel, // Default zoom level
            projection: directEdit.projection,
        })
        
     
    }

   


    public update(options: VisualUpdateOptions) {
      this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);
        
// if (options.dataViews 
//     && options.dataViews[0] 
//     && options.dataViews[0].categorical
//     && options.dataViews[0].categorical.categories
//     && options.dataViews[0].categorical.values
// )
// {
//     dataView = options.dataViews[0];

// }

dataView = options.dataViews[0];

var dataObj = { 'locations': dataView.categorical.categories[0].values,
                'latitudesData': dataView.categorical.values[0].values,
                'longitudesData': dataView.categorical.values[1].values,
                'mapData': dataView.categorical.values[2].values,
                'markerColors': dataView.categorical.values[3].values
              }
var dataObj1 = {
        'locations' : [''],
        'latitudesData' : [0],
        'longitudesData' :[0],
        'mapData': [0],
        'markerColors': ['transparent']
}

    var locations 
    var latitudesData 
    var longitudesData
    var mapData
    var markerColors

if (dataView.categorical.categories[0].values 
    || dataView.categorical.values[0].values
    || dataView.categorical.values[1].values
    || dataView.categorical.values[2].values
    || dataView.categorical.values[3].values
)
{

    locations = dataObj.locations
    latitudesData = dataObj.latitudesData
    longitudesData = dataObj.longitudesData
    mapData= dataObj.mapData
    markerColors = dataObj.markerColors
    
}
else
{

    locations = dataObj1.locations
    latitudesData = dataObj1.latitudesData
    longitudesData = dataObj1.longitudesData
    mapData= dataObj1.mapData
    markerColors = dataObj1.markerColors
    
}

/*
    var locations = (dataView.categorical.categories[0].values) ? [''] : dataView.categorical.categories[0].values
    var latitudesData = (dataView.categorical.values[0].values) ? [-71] : dataView.categorical.values[0].values
    var longitudesData = (dataView.categorical.values[1].values) ? [52] : dataView.categorical.values[1].values
    var mapData= (dataView.categorical.values[2].values) ? [0] :dataView.categorical.values[2].values
    var markerColors = (dataView.categorical.values[3].values) ?  ['red'] : dataView.categorical.values[3].values

    
    

       
        locations = ['']
        latitudesData = [-71]
        longitudesData = [52]
        mapData= [0]
        markerColors = ['red']
                
            
*/
        
        

        // var locations = ['']
// var latitudesData = [-71]
// var longitudesData = [52]
// var mapData = [0]
// var markerColors= ['transparent']

       // console.log('Visual update', options);
       console.log('locations', locations);

        var directEdit1 = dataView.metadata.objects.directEdit
        var dataViewLen = Object.keys(dataView).length

        //console.log('before', directEdit);

        if(Object.keys(directEdit1).length === 6)
        {
        directEdit.showMarkers = dataView.metadata.objects.directEdit.showMarkers
        directEdit.style_Url = directEdit1.styleUrl as typeof directEdit.style_Url
        directEdit.projection = directEdit1.projection as typeof directEdit.projection
        directEdit.centerLat= directEdit1.centerLat as typeof directEdit.centerLat
        directEdit.centerLong= directEdit1.centerLong as typeof directEdit.centerLong
        directEdit.zoomlevel = directEdit1.zoomLevel as typeof directEdit.zoomlevel
        }
        console.log('after', directEdit.showMarkers);
       

   this.initializeMap()


      /* this.map = new mapboxgl.Map({
                    container: this.target,
                    style: directEdit.style_Url,
                    center: [directEdit.centerLong, directEdit.centerLat], // Default center
                    zoom: directEdit.zoomlevel, // Default zoom level
                    projection: directEdit.projection,
                })

*/
              

               if (dataView.metadata.objects.directEdit.showMarkers === true)
               {
        for (let x = 0; x < locations.length; x++) {
           
            
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(''+locations[x]+'-'+mapData[x]+' ')
         
            const marker1=new mapboxgl.Marker({color: markerColors[x]})
            .setLngLat([longitudesData[x],latitudesData[x]])
            .setPopup(popup)
            .addTo(this.map);
           // marker1.remove();
           }
        }
        else
        {

            for (let x = 0; x < locations.length; x++) {
           
            
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(''+locations[x]+'-'+mapData[x]+' ')
             
                const marker1=new mapboxgl.Marker({color: markerColors[x]})
                .setLngLat([longitudesData[x],latitudesData[x]])
                .setPopup(popup)
                .addTo(this.map);
                marker1.remove();
               }

        }

       
       //  this.initializeMap()

      //  console.log('before mapEdits', mapEdits);

    //   console.log('locations', locations)
    //   console.log('latitudesData', latitudesData)
    //   console.log('longitudesData', longitudesData)
    //   console.log('markerColors', markerColors)
    //   console.log('mapData', mapData)
       
        var mapEdits1 = dataView.metadata.objects.mapEdits
        
        mapEdits.geojsonLink = mapEdits1.geojsonLink
        mapEdits.infoOnClick = mapEdits1.infoOnClick
        

        console.log('after mapEdits',mapEdits1)
        
       


        // locations = dataView.categorical.categories[0].values as typeof locations;
        // latitudesData = dataView.categorical.values[0].values as typeof latitudesData;
        // longitudesData = dataView.categorical.values[1].values as typeof longitudesData;
        // mapData = dataView.categorical.values[2].values as typeof mapData;
        // markerColors= dataView.categorical.values[3].values as typeof markerColors;
        console.log('dataViewLen',dataViewLen)
       
       
        // locations = [...dataView.categorical.categories[0].values]

        // latitudesData = [...dataView.categorical.values[0].values]

        // longitudesData = [...dataView.categorical.values[1].values]

        // mapData= [...dataView.categorical.values[2].values]

        // markerColors = [...dataView.categorical.values[3].values]
        //this.initializeMap()
    
      console.log('locations2',locations)
        
            
        //     this.initializeMap()

        var choroplethRange1 = dataView.metadata.objects.choroplethRange
        
        choroplethRange.dataKey = choroplethRange1.dataKey
        choroplethRange.range1Value = choroplethRange1.range1Value
        choroplethRange.range1Color = choroplethRange1.range1Color
        choroplethRange.range2Value = choroplethRange1.range2Value
        choroplethRange.range2Color = choroplethRange1.range2Color
        choroplethRange.range3Value = choroplethRange1.range3Value
        choroplethRange.range3Color = choroplethRange1.range3Color
        choroplethRange.range4Value = choroplethRange1.range4Value
        choroplethRange.range4Color = choroplethRange1.range4Color
        choroplethRange.range5Value = choroplethRange1.range5Value
        choroplethRange.range5Color = choroplethRange1.range5Color
        

        var radarSettings1 = dataView.metadata.objects.radarSettings
      
        radarSettings.radarUrl = radarSettings1.radarUrl as typeof radarSettings.radarUrl
        radarSettings.radarLat_1 =  radarSettings1.radarLat_1 as typeof radarSettings.radarLat_1
        radarSettings.radarLong_1 =  radarSettings1.radarLong_1 as typeof radarSettings.radarLat_1
        radarSettings.radarLat_2 =  radarSettings1.radarLat_2 as typeof radarSettings.radarLat_2
        radarSettings.radarLong_2 =  radarSettings1.radarLong_2 as typeof radarSettings.radarLat_2
        

      // console.log('dataViewLen', dataViewLen)
       console.log('locations', locations)
       console.log('latitudesData', latitudesData)
       console.log('longitudesData', longitudesData)
       console.log('markerColors', markerColors)
       console.log('mapData', mapData)
     // console.log('directEdit',directEdit)
      // console.log('mapEdits',  Object.keys(mapEdits).length)
      // console.log('choroplethRange', Object.keys(choroplethRange).length)
      // console.log('radarCoordinates',radarCoordinates)

      // let geoJsonLnk: string = geojsonLink as string;
      // let infoOnClck: string = infoOnClick as string;
    //    let radarUrl_str:string=radarUrl as string;
    //    let radarLt1: number = radarLat_1 as number;
    //    let radarLng1: number = radarLong_1 as number;
    //    let radarLt2: number = radarLat_2 as number;
    //    let radarLng2: number = radarLong_2 as number;

       
   

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
/*
   this.map.addSource('modis-lst', {
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
        'url': radarSettings.radarUrl,
        'coordinates':  [ 
            [radarSettings.radarLat_1, radarSettings.radarLong_1],
            [radarSettings.radarLat_2, radarSettings.radarLong_1],
            [radarSettings.radarLat_2, radarSettings.radarLong_2],
            [radarSettings.radarLat_1, radarSettings.radarLong_2],
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
       //'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
        //'data': 'https://raw.githubusercontent.com/adarshbiradar/maps-geojson/refs/heads/master/india.json'
        'data': mapEdits.geojsonLink
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
                ['get', choroplethRange.dataKey],
                choroplethRange.range1Value, choroplethRange.range1Color,
                choroplethRange.range2Value, choroplethRange.range2Color,
                choroplethRange.range3Value, choroplethRange.range3Color,
                choroplethRange.range4Value, choroplethRange.range4Color,
                choroplethRange.range5Value, choroplethRange.range5Color,
            ],
            'fill-opacity': 0.8
        }
    });

    this.map.addSource('ethnicity', {
        type: 'vector',
        url: 'mapbox://examples.8fgz4egr'
    });
    this.map.addLayer(
        {
            'id': 'population',
            'type': 'circle',
            'source': 'ethnicity',
            'source-layer': 'sf2010',
            'paint': {
                // Make circles larger as the user zooms from z12 to z22.
                'circle-radius': {
                    'base': 1.75,
                    'stops': [
                        [12, 2],
                        [22, 180]
                    ]
                },
                // Color circles by ethnicity, using a `match` expression.
                'circle-color': [
                    'match',
                    ['get', 'ethnicity'],
                    'White',
                    '#fbb03b',
                    'Black',
                    '#223b53',
                    'Hispanic',
                    '#e55e5e',
                    'Asian',
                    '#3bb2d0',
                    /* other */ '#ccc'
                ]
            }
        },
        // Place polygons under labels, roads and buildings.
        'aeroway-polygon'
    );

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