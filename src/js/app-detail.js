var burger_id = parseInt(getParameterByName('burger_id'));
var urlBurger = "https://itexico-laboratoria.azurewebsites.net/api/v1/Places/" + burger_id;

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
	var id = burger_id-1;
	var coords = {
		lat: adressBurger[id].lat,
		lng: adressBurger[id].lng
	};
	showMap(coords);
};

fetch(urlBurger)
	.then(
	function(response) {
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
									response.status);
			return;
		}
		return response.json();
	})
	.then(
	function(response){
		var burgerDescription = response.Description;
		var burgerDistance = response.Distance;
		var burgerMainImg = response.MainImage;
		var burgerName = response.Name;
		var burgerPlaces = response.Places;

		console.log(burgerDescription,burgerDistance,burgerMainImg, burgerName, burgerPlaces);

		$("#name").text(burgerName);
		$("#distance").text(burgerDistance);
		$("#seats").text(burgerPlaces);
		$("#description").text(burgerDescription);
		

	})
	.catch(function(err) {
	console.log('Fetch Error :-S sorry', err);
});



$(document).ready(loadPage);