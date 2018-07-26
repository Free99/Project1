//this is a test, to make sure im in the right location
//hopefully this shit is working
// Initialize Firebase
$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0pMtOIhxz6BT26CaqP1xW2m6rVxMTFAo",
    authDomain: "group-project-d9732.firebaseapp.com",
    databaseURL: "https://group-project-d9732.firebaseio.com",
    projectId: "group-project-d9732",
    storageBucket: "group-project-d9732.appspot.com",
    messagingSenderId: "252744545653"
  };
  firebase.initializeApp(config);

var database = firebase.database();



//this initializes the map and marker array
var markers = [];
var gMarker = "";
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 30.268, lng: -97},
    zoomControl: false
  });
var geocoder = new google.maps.Geocoder();


//funciton will be called everytime zip is searched but there are no listings in the database for that location
function geocodeAddressZipcode(geocoder, resultsMap, searchZip) {
    var address = searchZip;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(12)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

// this function empties the marker array and deletes the markers from the map
//for every amrker that is placed, we strore the marker in an array, to remove the markers
//we call the setMap method for each element in that array and set the array length to 0
function deleteMarkers(){
    for (var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }
      markers.length = 0;
}

//function is called when there is a listing in the database
//this function places a marker on the map for every listing returned by the database query
function geocodeAddressMarker(geocoder, resultsMap, searchAddress) {
    var address = searchAddress;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(12)
        var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        markers.push(marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}


function geocodeAddressListing(geocoder, resultsMap, searchAddress) {
    var address = searchAddress;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(18)
        var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        markers.push(marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}


//this function will be used to set a listings avaliable value to false after a user clicks they want the item
//pass the key ref of the listing stored in the reference-value attribute of the displayed listing
//"https://group-project-d9732.firebaseio.com need to remove this from the keyReference string for this to work
//address holds a sub string removing the above string from the reference
//function works
//TO BE CALLED WITHIN THE "I WANT IT" BUTTON EVENT LISTENER
function setToUnavaliable(keyReference){

    var address = keyReference.substring(42);
    var listingRef = database.ref(address);
        listingRef.update({
            avaliable: false,
        })

}





//this event listener fills database with user input from the create a listing page
//using the push mehtod to fill data
//storing the reference containing the special timestamp key within the listing in order to be able 
//to reference it later
 $("#submitListing").on("click",function(){

     event.preventDefault();

     //can have some sort of validation, add this later
     var tempName = $("#inputName").val().trim();
     var tempStreet = $("#inputStreet").val().trim();
     var tempCity = $("#inputCity").val().trim();
     var tempState = $("#inputState").val().trim();
     var tempZip = $("#inputZip").val().trim();
     var tempFurnType = $("#inputFurnType").val().trim();
     var tempFurnDims = $("#inputFurnDim").val().trim();
     var tempFurnWeight = $("#inputFurnWeight").val().trim();
     var tempListing = $("#inputListing").val().trim();

     //this works
     var tempFurnCond = $("#inputFurnCond").val();
     // var tempPic = $("#furnPicLinkid").val();

    //write some sort of input validation checking to make sure that all fields have been filled out
    //HAVE NOT WRITTEN ANY DATA VALIDATION
    //if data is validated is true then push data, else prompt user to fill out all fields
    var newKey = database.ref("/Listings").push();

    newKey.set({
        name: tempName,
        street: tempStreet,
        city: tempCity,
        state: tempState,
        zipcode: tempZip,
        keyRef: newKey.toString(),
        listing: tempListing,
        furniture: tempFurnType,
        dimensions: tempFurnDims,
        weight: tempFurnWeight,
        condition: tempFurnCond,
        avaliable: true



    });

    $("#inputName").val('');
    $("#inputAddress").val('');
    $("#inputCity").val('');
    $("#inputStreet").val('');
    $("#inputState").val('');
    $("#inputZip").val('');
    $("#inputFurnType").val('');
    $("#inputFurnDim").val('');
    $("#inputFurnWeight").val('');
    $("#inputListing").val('');


        
        


    });


//this function queries the database for the zipcode searched by the user
//we then display all listings matching the zipcode requested that are still avaliable
//if no listings in that area we display a message that there are no listings in that area

//I want to add a button that allows the user to just display all listings in the database,
//can order the database when that button is clicked however we want
$("#searchZip").on("click",function(){

    //this will be the zip code we are searching the databse for
    event.preventDefault();

    //clears the listings column so that new divs for listings are created everytime the user searches for a zipcode
    $("#listingbox").empty();

    //delete markers that were on the map from the previous search
    deleteMarkers();

    var searchZip = $("#inputSearchZip").val();

    console.log(searchZip);

    //listings is reference to the listings node in the firebase database
    var listings = database.ref().child('Listings');

    //query is a reference to all of the nodes within the listings node that have the zipcode value equal to searchZip
    var query = listings.orderByChild('zipcode').equalTo(searchZip);

    //actually reading from the database
    query.once("value").then(function(snapshot) {

        var doesExsist = snapshot.exists();

        //runs code if node exists within database
        if(doesExsist){
        console.log(snapshot.val());
        //cycle through each listing within the database and write to the page simultaneously
        snapshot.forEach(function(childSnap){
            //only display listings that are avaliable by checking if the avaliable key is set to true
            if(childSnap.val().avaliable){
            
            //get all data from the database
            var tempName = childSnap.val().name;
            console.log(tempName);
            var tempListing = childSnap.val().listing;
            console.log(tempListing);
            var tempZip = childSnap.val().zipcode;
            console.log(tempZip);
            var tempRef = childSnap.val().keyRef;
            console.log(tempRef);
            var tempFurnType = childSnap.val().furniture;
            console.log(tempFurnType);
            var tempCity = childSnap.val().city;
            console.log(tempCity);
            var tempState = childSnap.val().state;
            console.log(tempState);
            var tempStreet = childSnap.val().street;
            console.log(tempStreet);
            var tempFurnWeight = childSnap.val().weight;
            console.log(tempFurnWeight);
            var tempFurnDim = childSnap.val().dimensions;
            console.log(tempFurnDim);
            var tempFurnCond = childSnap.val().condition;
            console.log(tempFurnCond);
            
            var address = tempStreet + " " + tempCity + " "  + tempState + " " + tempZip;

            //function alters map to go to the zipcode requested by the user and places a map marker for
            //each listing returned in the query
            geocodeAddressMarker(geocoder, map, address);

            var newListing = $('<li class="daTing btn btn-light list-group-item" type="button" zip-value="'+ tempZip +'" city-value="'+ tempCity +'" state-value="'+ tempState +'" reference-value="' + tempRef + '" street-value="'+ tempStreet +'" name-value="'+ tempName +'" furnType-value="'+ tempFurnType +'" furnWeight-value="'+ tempFurnWeight +'" furnDim-value="'+ tempFurnDim +'" furnCond-value="'+ tempFurnCond +'" listingName-value="' + tempListing + '"> Listing: '+ tempListing +' <div class="daTing"> Furniture: ' + tempFurnType + '</div></li>');
            //once we have the data here, It think it would be best to store the details within the divs
            //we are creaeting for each listing, that way when the user clicks the div we do not have to
            //access the database again

            $("#listingbox").append(newListing);

            
            } else{

            }


        });

        //if the data does not exsist, return "no listing in the area requested"
        } else{

        var noListingMessage = "sorry there are no listings in the area you requested"

        $('#listingbox').append('<li class=list-group-item>' + noListingMessage + '</li>');

        console.log(noListingMessage);
        
        //function alters map to go to zipcode requested by the user even though this is called when there are no listings
        //in the zipcode the user searched
        geocodeAddressZipcode(geocoder, map, searchZip);
        }

       


    });



});

//this is the event listener for the listings, going to display the details for the furniture
$(document).on('click',".daTing",function(){

    event.preventDefault();
    deleteMarkers();

    $("#listing-details").empty();

    var furnitureType = $(this).attr("furnType-value");
    console.log(furnitureType);
    var contactName = $(this).attr("name-value");
    console.log(contactName);
    var furnitureWeight = $(this).attr("furnWeight-value");
    console.log(furnitureWeight);
    var furnitureDim = $(this).attr("furnDim-value");
    console.log(furnitureDim);
    var furnitureCond = $(this).attr("furnCond-value");
    console.log(furnitureCond);
    var contactStreet = $(this).attr("street-value");
    console.log(contactStreet);
    var contactState = $(this).attr("state-value");
    console.log(contactState);
    var contactZip = $(this).attr("zip-value");
    console.log(contactZip);
    var contactCity = $(this).attr("city-value");
    console.log(contactCity);
    var listingName = $(this).attr("listingName-value")

    var address = contactStreet + " " + contactCity + " "  + contactState + " " + contactZip;
    geocodeAddressListing(geocoder, map, address);

    var listingElement = $('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Listing Details</h5><h6 class="card-subtitle mb-2 text-muted">' + listingName + '</h6></div></div>');
    listingElement.append('<p> contact name: ' + contactName + '</p>');
    listingElement.append('<p> furniture: ' + furnitureType + '</p>');
    listingElement.append('<p> address: ' + address + '</p>');
    $('#listing-details').append(listingElement);


});


});



