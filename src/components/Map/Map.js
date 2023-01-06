
import am4geodata_vnLow from "@amcharts/amcharts4-geodata/vietnamLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { useEffect } from "react";
am4core.useTheme(am4themes_animated);

const Map = () => {
  useEffect(() => {
    // Create map instance
    const chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldHigh;
    chart.projection = new am4maps.projections.Mercator();
    chart.homeZoomLevel = 9;
    chart.maxZoomLevel = 10;
    chart.panBehavior = "move";
    chart.seriesContainer.draggable = true;
    chart.seriesContainer.resizable = true;
    chart.homeGeoPoint = {
      latitude: 15.110507,
      longitude: 105.817291,
    };

    chart.projection = new am4maps.projections.Miller();

    // Series for World map
    let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.exclude = ["AQ"];
    worldSeries.useGeodata = true;
    let polygonTemplate = worldSeries.mapPolygons.template;
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.fill = am4core.color("#38424B");
    polygonTemplate.stroke = am4core.color("#43383E");

    // Series for Vietnam map
    let vnSeries = chart.series.push(new am4maps.MapPolygonSeries());
    vnSeries.geodata = am4geodata_vnLow;
    let vnPolygonTemplate = vnSeries.mapPolygons.template;
    vnPolygonTemplate.tooltipText = "{name} : {value}";
    vnPolygonTemplate.fill = "#797979";
    vnPolygonTemplate.stroke = "#43383E";
    vnPolygonTemplate.nonScalingStroke = true;


    // // Hover state
    // let hsvn = vnPolygonTemplate.states.create("hover");
    // hsvn.properties.fill = am4core.color("#43383E");



    // Add countries show on map
    const isLandSeries = chart.series.push(new am4maps.MapImageSeries());
    const isLandImageTemplate = isLandSeries.mapImages.template;
    isLandImageTemplate.propertyFields.longitude = "longitude";
    isLandImageTemplate.propertyFields.latitude = "latitude";
    isLandImageTemplate.nonScaling = true;

    let isLandImage = isLandImageTemplate.createChild(am4core.Image);
    isLandImage.propertyFields.href = "imageURL";
    isLandImage.width = 15;
    isLandImage.height = 15;
    isLandImage.horizontalCenter = "middle";
    isLandImage.verticalCenter = "top";

    //Show title countries on map
    let isLandLabel = isLandImageTemplate.createChild(am4core.Label);
    isLandLabel.text = "{title}";
    isLandLabel.fill = am4core.color("white");
    isLandLabel.horizontalCenter = "middle";
    isLandLabel.verticalCenter = "top";
    isLandLabel.dy = 20;

    isLandSeries.data = [
      {
        title: "Hoang Sa",
        latitude: 16.264893,
        longitude: 112.322125,
        imageURL: "/vietnam.png",

      },
      {
        title: "Truong Sa",
        latitude: 10.447948,
        longitude: 115.180288,
        imageURL: "/vietnam.png",

      },
      {
        title: "Ha Noi ",
        latitude: 21.0285,
        longitude: 105.8048,
        imageURL: "/vietnam.png",
        width: 40,
        height: 40,

      },
      {
        title: "Ho Chi Minh city",
        latitude: 10.7626,
        longitude: 106.6601,
        imageURL: "/vietnam.png",

      },
      {
        title: "Da Nang City",
        latitude: 16.047,
        longitude: 108.2062,
        imageURL: "/vietnam.png",

      },
    ];
  }, []);
  return (
    <div
      className={`static h-screen w-full `}
      style={{
        background: `#2B323A`,
      }}
    >
      <div class="flash-loading py-5">
        <div class=" text-white font-bold subtitle m-0 text-[20px] uppercase">
          <p className="text-center">MAP VIETNAM AMCHART</p>
        </div>
      </div>
      <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>


    </div>
  );
};

export default Map;
