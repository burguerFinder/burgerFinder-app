var burger_id = getParameterByName('burger_id');
var urlBurger = "https://itexico-laboratoria.azurewebsites.net/api/v1/Places" + burger_id;

if(burger_id){
	console.log("El burger id es:"+ burger_id);
}
var adressBurger =[
	{
		"lat": 19.4660768, 
		"lng": -99.1865509
	},
	{	
		"lat": 19.4497338, 
		"lng": -99.1600218
	},
	{
		"lat": 19.5107253,
		"lng": -99.1374483 
	}
];

var loadPage = function () {
	currentDirection();
	showBurger();
};

var currentDirection = function (){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(viewPosition);
	} else {
		alert("Update your browser");
	}
};

var viewPosition = function (position){
	var coords= {
		lat: position.coords.latitude, 
		lng: position.coords.longitude
	};

};
var showMap = function (coords) {
	var map = new google.maps.Map($('.map')[0], {
		zoom: 18,
		center: coords
	});
	var marker = new google.maps.Marker({
		position: coords,
		map: map
	});
}
var showBurger = function (){
	
	var coords = {
		lat: adressBurger[burger_id-1].lat,
		lng: adressBurger[burger_id-1].lng
	};
	showMap(coords);
};

fetch(urlBurger).then


$(document).ready(loadPage);