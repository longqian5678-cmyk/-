<template>
  <div id="CNAmap"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { usePartnerStore } from "@/stores/partners";
import countries from "@/assets/data/countries.json";

let geoJson;
let map;
let selectedCountryLayer;
let selectCountryColor = "#f5a640";

// Stores each geoJson country by country name
let geoJsonByCountry = {};

const partnerStore = usePartnerStore();
const { selectedPartnerCountry } = storeToRefs(partnerStore);
const cnaCountryCounts = partnerStore.partnerCounts.countries;

onMounted(() => {
  map = L.map("CNAmap", {
    worldCopyJump: true,
    zoomSnap: 0.3,
    zoomDelta: 0.3,
    attributionControl: true,
  }).setView([44, 0], 1.6);

  map.attributionControl.setPrefix('<a href="https://leafletjs.com"> Leaflet </a>');

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  geoJson = L.geoJson(countries, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  let legend = L.control({ position: "bottomleft" });

  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [[0, 3], [4, 7], [8, 12], [13]];

    div.innerHTML = "<div> Partners by Country </div>";

    // Create legend icon for each color interval
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i][0] + 1) +
        '"></i> ' +
        grades[i][0] +
        (grades[i][1] ? "&ndash;" + grades[i][1] + "<br>" : "+");
    }
    div.innerHTML +=
      '<br><i style="background: ' + selectCountryColor + '; opacity: 1"></i> Selected Country';
    return div;
  };

  legend.addTo(map);
});

watch(selectedPartnerCountry, (newVal) => {
  //Only trigger click if change happened outside this component
  if (!partnerStore.selectedCountryInternalChange) {
    geoJsonByCountry[newVal]?.fire("click");
  }
});

function getColor(d) {
  return d > 13
    ? "#1599eb"
    : d >= 8
    ? "#f52505"
    : d >= 4
    ? "#246e3a"
    : d > 0
    ? "#8d10b3"
    : "#FFFFFF";
}

function style(feature) {
  return {
    fillColor: getColor(cnaCountryCounts[feature.properties.name]),
    weight: 2,
    opacity: 1,
    color: "gray",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

function highlightFeature(e) {
  let layer = e.target;

  //Only highlight countries that have at least one CNA
  if (cnaCountryCounts[layer.feature.properties.name]) {
    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.5,
    });

    layer.bringToFront();
  }
}

function selectCountry(e) {
  //Only select countries that have at least one CNA
  if (!cnaCountryCounts[e.target.feature.properties.name]) {
    return;
  }
  //If a country is already selected, remove selection layer from map
  if (selectedCountryLayer) {
    selectedCountryLayer.removeFrom(map);
  }

  //Create layer from selected country and add it to
  selectedCountryLayer = L.geoJson(e.target.feature, {
    pane: "markerPane",
  });

  //Set selected country style
  selectedCountryLayer.setStyle({
    weight: 3,
    color: "#666",
    fillColor: "#f5a640",
    dashArray: "",
    fillOpacity: 1,
  });

  selectedCountryLayer.addTo(map);
  selectedCountryLayer.bringToFront();

  // Update selectedPartnerCountry in the store, and set the internal flag to true
  partnerStore.selectedCountryInternalChange = true;
  partnerStore.selectedPartnerCountry = selectedCountryLayer.getLayers()[0].feature.properties.name;
}

function resetHighlight(e) {
  geoJson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
  const popupContent = cnaCountryCounts[feature.properties.name]
    ? cnaCountryCounts[feature.properties.name]
    : 0;

  if (cnaCountryCounts[feature.properties.name]) {
    //Populate key value pair of each country with at least one CNA
    geoJsonByCountry[feature.properties.name] = layer;

    layer.bindPopup(feature.properties.name + ": " + popupContent, {
      closeOnClick: false,
    });
  }

  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: selectCountry,
  });
}
</script>

<!-- This can't be scoped or it screws up the legend in the map.
     The map is inserted into the DOM and contains elements with the
     "legend" and "info" classes.
-->

<style lang="scss">
#CNAmap {
  height: 500px;
  z-index: 1;
  width: 800px;
}

.legend {
  line-height: 18px;
  color: #555;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}

.info {
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-weight: bold;
}
</style>
