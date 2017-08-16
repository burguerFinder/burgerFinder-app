var urlBurger = "https://itexico-laboratoria.azurewebsites.net/api/v1/Places/";

var template = "<div class='col s12 m4'>" +
  "<div class='card'>" +
    "<div class='card-image'>" +
      "<img src='../img/Iamge_*__index__*.png' class='responsive-img'>" +
    "</div>" +
    "<div class='card-content'>" +
      "<div class='row'>" +
        "<div class='col s6 m6'>" +
          "<h6>*__name__*</h6>" +
          "<div class='valign-wrapper'>" +
            "<img src='../img/arrow.png' alt='arrow' class='responsive-img'>" +
            "<p><small>*__distance__* km away</small></p>" +
          "</div>" +
        "</div>" +
        "<div class='col s6 m6'>" +
          "<div class='valign-wrapper right'>" +
            "<img src='../img/person.png' alt='person' class='responsive-img'>" +
            "<span>*__places__*</span>" +
          "</div>" +
          "<div class='row'>" +
            "<div class='valign-wrapper right'>" +
              "<p><small>seats available</small></p>" +
            "</div>" +
          "</div>" +
        "</div>" +
        "<div class='row'>" +
          "<div class='valign-wrapper right'>" +
            "<p><a href='detail.html?burger_id=*__link__*'>Detail</a></p>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>" +
  "</div>" +
"</div>";

var templateBurgerCard = " ";

var createBurgerCard = function(response, index){
  var restaurantName = response.Name;
  var restaurantDistance = response.Distance;
  var restaurantPlaces = response.Places;
  var restaurantMainImage = response.MainImage;
  

   templateBurgerCard += template.replace("*__index__*", index + 1)
    .replace("*__name__*", restaurantName)
    .replace("*__distance__*", restaurantDistance)
    .replace("*__places__*", restaurantPlaces)
    .replace("*__link__*", index + 1);

    $("#mainRow").html(templateBurgerCard);

};

fetch(urlBurger)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
        return response;
  })
  .then(function(response){

    var responses = response.json();
    return responses;

  })
  .then(function(responses, index){

    responses.forEach(createBurgerCard, index);
  })

  .catch(function(err) {

    console.log('Fetch Error :-S sorry', err);

  });
