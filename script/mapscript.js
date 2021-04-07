var map = L.map("map").setView([28.66,77.16], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var PHCIcon = L.icon({
    iconUrl: 'icons/health.png',
    iconSize: [15,15],
    iconAnchor: [4, 7],
    popupAnchor: [0,-2]}),

    AAMCIcon = L.icon({
    iconUrl: 'icons/hospital.png',
    iconSize: [15,15],
    iconAnchor: [4, 7],
    popupAnchor: [0,-2]})

function fill_slum_name(e) {
    var currentLayer = e.target;
    $("#slum_name").html(
        currentLayer.feature.properties.Name
        )
    };

function fill_slum_zone(e) {
    var currentLayer = e.target;
    $("#zone").html(
        currentLayer.feature.properties.zone
        )
    };

function fill_pop(e) {
    var currentLayer = e.target;
    $("#pop").html(
        currentLayer.feature.properties.population
        )
    };

function fill_households(e) {
    var currentLayer = e.target;
    $("#households").html(
        currentLayer.feature.properties.households
        )
    };

function fill_near_PHC(e) {
    var currentLayer = e.target;
    $("#near_PHC").html(
        currentLayer.feature.properties.near_PHC
        )
    };

function fill_near_AAMC(e) {
    var currentLayer = e.target;
    $("#near_AAMC").html(
        currentLayer.feature.properties.AAMCName
        )
    };

function fill_near_refferal(e) {
    var currentLayer = e.target;
    $("#near_refferal").html(
        currentLayer.feature.properties.near_reffe
        )
    };

function fill_near_immunization(e) {
    var currentLayer = e.target;
    $("#near_immunization").html(
        currentLayer.feature.properties.immunizati
        )
    };

function fill_near_delivery(e) {
    var currentLayer = e.target;
    $("#near_delivery").html(
        currentLayer.feature.properties.delivery
        )
    };

function fill_near_sterilization(e) {
    var currentLayer = e.target;
    $("#near_sterilization").html(
        currentLayer.feature.properties.sterilizat
        )
    };

function fill_near_DOTS(e) {
    var currentLayer = e.target;
    $("#near_DOTS").html(
        currentLayer.feature.properties.dots_centr
        )
    };


$.getJSON("data/slum_pilot_master_data.geojson", function(data){
    $.each(data.features, function(key, value){
        point = L.geoJSON(value, {
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Name: "+feature.properties.Name+"<br>"+"Zone: "+feature.properties.zone)
                .on("click", fill_slum_name)
                .on("click", fill_slum_zone)
                .on("click", fill_pop)
                .on("click", fill_households)
                .on("click", fill_near_PHC)
                .on("click", fill_near_AAMC)
                .on("click", fill_near_refferal)
                .on("click", fill_near_immunization)
                .on("click", fill_near_delivery)
                .on("click", fill_near_sterilization)
                .on("click", fill_near_DOTS)
            }
        })
        .addTo(map);
    })
});


$.getJSON("data/PHC_locations.geojson", function(data){
    $.each(data.features, function(key, value){
        point = L.geoJSON(value.geometry, {
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: PHCIcon});
            }
        })
        .bindPopup(value.properties.Name)
        .addTo(map);
    })
});