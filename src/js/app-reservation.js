var url = "https://itexico-laboratoria.azurewebsites.net/api/v1/Book";

var inputDay = $("#reservationDay");
var inputHour = $("#reservationHour");
var inputSeats =$("#userSeats");
var inputUserName = $("#userName");
var inputUserEmail = $("#userEmail");
var inputPhoneNumber = $("#phoneNumber");
var btnConfirm = $("#confirmButton");


var dateConfirm = $("#date-hour");
var seatsConfirm = $("#seats-confirm");

var cardId = getParameterByName('card_id');

function loadPage(){
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year,
		today: 'Today',
		clear: 'Clear',
		close: 'Ok',
		closeOnSelect: false // Close upon selecting a date,
	});
	$('.timepicker').pickatime({
		default: 'now',
		fromnow: 0,
		twelvehour: false,
		donetext: 'OK',
		cleartext: 'Clear',
		canceltext: 'Cancel',
		autoclose: false,
		ampmclickable: true,
	});

	inputDay.change(validateDataForm);
	inputHour.change(validateDataForm);
	inputUserName.change(validateDataForm);
	inputUserEmail.change(validateDataForm);
	inputPhoneNumber.change(validateDataForm);
	inputPhoneNumber.keyup(validateDataForm);
	inputUserEmail.keyup(validateDataForm);
}

function validateDataForm(){
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	console.log(inputDay.val().length)
	if(inputDay.val().length > 1 && inputUserName.val().length > 1 && regex.test(inputUserEmail.val()) && inputPhoneNumber.val().length === 10){

		btnConfirm.removeAttr("disabled");
		confirmReservation();
	} else{
		btnConfirm.attr("disabled", true);
	}
};

function confirmReservation (){
	fetch(url, {
	    method: 'post',
	    headers: {
	      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
	      "content-type": "application/json; charset=utf-8"
	    },
	      body: JSON.stringify({
	      "Date": inputDay.val(),
	      "Seats": inputSeats.val(),
	      "Name": inputUserName.val(),
	      "Email": inputUserEmail.val(),
	      "Phone": inputPhoneNumber.val()
	    })
	  })
	  .then(function(json){

			dateConfirm.text(inputDay.val());
			seatsConfirm.text(inputSeats.val());
	  })

	  .catch(function (error) {
	    console.log('Request failed', error);
			console.log(dateHour);
	  });
}









$(document).ready(loadPage);
