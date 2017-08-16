var burger_id = parseInt(getParameterByName('burger_id'));
var urlBurger = "https://itexico-laboratoria.azurewebsites.net/api/v1/Places/" + burger_id;

if(burger_id){
	console.log("El burger id es:"+ burger_id);
}
var addressBurger =[
	{
		"lat": 19.4660768, 
		"lng": -99.1865509,
		"link": "https://www.google.com.mx/maps/place/19%C2%B027'57.9%22N+99%C2%B011'11.6%22W/@19.4660833,-99.1887443,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.4660768!4d-99.1865509"
	},
	{	
		"lat": 19.4497338, 
		"lng": -99.1600218,
		"link": "https://www.google.com.mx/maps/dir//19.4497338,-99.1600218/@19.4496984,-99.1607138,18z/data=!4m8!1m7!3m6!1s0x0:0x0!2zMTnCsDI2JzU5LjAiTiA5OcKwMDknMzYuMSJX!3b1!8m2!3d19.4497338!4d-99.1600218"
	},
	{
		"lat": 19.5107253,
		"lng": -99.1374483,
		"link": "https://www.google.com.mx/maps/dir//19.5107253,-99.1374483/@19.5107253,-99.139637,17z/data=!4m8!1m7!3m6!1s0x0:0x0!2zMTnCsDMwJzM4LjYiTiA5OcKwMDgnMTQuOCJX!3b1!8m2!3d19.5107253!4d-99.1374483"
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
		lat: addressBurger[id].lat,
		lng: addressBurger[id].lng
	};
	$("#get-directions").attr("href", addressBurger[id].link);
	showMap(coords);
};

var showDetail = function (response) {
	var burgerDescription = response.Description;
	var burgerDistance = response.Distance;
	var burgerMainImg = response.MainImage;
	var burgerName = response.Name;
	var burgerPlaces = response.Places;
	var burgerPhotos = response.Images;
	console.log(response);
	console.log(burgerDescription,burgerDistance,burgerMainImg, burgerName, burgerPlaces);

	$("#name").text(burgerName);
	$("#distance").text(burgerDistance);
	$("#seats").text(burgerPlaces);
	$("#description").text(burgerDescription);
	burgerPhotos.forEach(showPhotos)
};

var templateDetailFinal ="";
var templateDetail = '<div class="col s12 m6">' +
		'<img src="../img/__img1__" alt="photo-*__index__*">' +
		'</div>' 


var showPhotos = function (burgerPhoto, index){
	templateDetailFinal+= templateDetail.replace('__img1__', burgerPhoto).replace('__index__', index);
	$("#photos").html(templateDetailFinal);
}

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
		showDetail(response);
	})
	.catch(function(err) {
	console.log('Fetch Error :-S sorry', err);
});



$(document).ready(loadPage);