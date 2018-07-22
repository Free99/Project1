//this is a test, to make sure im in the right location
//hopefully this shit is working
// Initialize Firebase

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





//create function to fill database with information based on zipcode provided
//filling the database is on hold



// //event listener for submit button
 $("#submitListing").on("click",function(){

     event.preventDefault();

     //can have some sort of validation, add this later
     //still waiting on IDs for data entered by user
     var tempName = $("#inputName").val().trim();
     var tempStreet = $("#inputAddress").val().trim();
     var tempCity = $("#inputCity").val().trim();
     var tempState = $("#inputState").val().trim();
     var tempZip = $("#inputZip").val().trim();
     var tempFurnType = $("#inputFurnType").val().trim();
     var tempFurnDims = $("#inputFurnDim").val().trim();
     var tempFurnWeight = $("#inputFurnWeight").val().trim();
     var tempListing = $("#inputListing").val().trim();

     //since the condition will be a button, need to tweak this to get the attribute associated with the button
     var tempFurnCond = $("#inputFurnCond").val();
     // var tempPic = $("#furnPicLinkid").val();

    //write some sort of input validation checking to make sure that all fields have been filled out
    //if data is validated is true then push data, else prompt user to fill out all fields
    database.ref("/Listings").push({
        name: tempName,
        street: tempStreet,
        city: tempCity,
        state: tempState,
        zipcode: tempZip,
        listing: tempListing,
        furniture: tempFurnType,
        dimensions: tempFurnDims,
        weight: tempFurnWeight,
        condition: tempFurnCond,



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


    






// for now just going to populate the listings column with the data every
//before doing this need to research if we can order the database using the zipcode searched
//if so i need to create a function that orders the database that is called everytime a user adds a listing or the page is refreshed
//this kills two birds with one stone


$("#searchZip").on("click",function(){

    //this will be the zip code we are searching the databse for
    event.preventDefault();

    $("#listingbox").empty();

    var searchZip = $("#inputSearchZip").val();

    console.log(searchZip);

    var listings = database.ref().child('Listings');
    var query = listings.orderByChild('zipcode').equalTo(searchZip);


    query.once("value").then(function(snapshot) {

        var doesExsist = snapshot.exists();

        //runs code if node exists within database
        if(doesExsist){
        console.log(snapshot.val());
        //cycle through each listing within the database and write to the page simultaneously
        snapshot.forEach(function(childSnap){

            var tempName = childSnap.val().name;
            console.log(tempName);
            var tempListing = childSnap.val().listing;
            console.log(tempListing);
            var tempZip = childSnap.val().zipcode;
            console.log(tempZip);
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


            var newListing = $('<li class="listing list-group-item" zip-value="'+ tempZip +'" city-value="'+ tempCity +'" street-value="'+ tempStreet +'" name-value="'+ tempName +'" furnType-value="'+ tempFurnType +'" furnWeight-value="'+ tempFurnWeight +'" furnDim-value="'+ tempFurnDim +'" furnCond-value="'+ tempFurnCond +'"> Listing: '+ tempListing +' Furniture: ' + tempFurnType + '</li>');
            //once we have the data here, It think it would be best to store the details within the divs
            //we are creaeting for each listing, that way when the user clicks the div we do not have to
            //access the database again

            $("#listingbox").append(newListing);


        });




        //if the data does not exsist, return "no listing in the area requested"
        } else{

        var noListingMessage = "sorry there are no listings in the area you requested"

        $('#listingbox').append('<li class=list-group-item>' + noListingMessage + '</li>');

        console.log(noListingMessage);
        }


    });



});



var ref =  database.ref("78845");


ref.once("value").then(function(snapshot) {

    var doesExsist = snapshot.exists();

    //runs code if node exists within database
    if(doesExsist){
    console.log(snapshot.val());
    //cycle through each listing within the database and write to the page simultaneously
    snapshot.forEach(function(childSnap){

        var tempName = childSnap.val().name;
        console.log(tempName);
        var tempZip = childSnap.val().zipcode;
        console.log(tempZip);
        var tempFurnType = childSnap.val().furnType;
        console.log(tempFurnType);

        //once we have the data here, It think it would be best to store the details within the divs
        //we are creaeting for each listing, that way when the user clicks the div we do not have to
        //access the database again




    });




    //if the data does not exsist, return "no listing in the area requested"
    } else{

        var noListingMessage = "sorry there are no listings in the area you requested"

        console.log(noListingMessage);
    }


});