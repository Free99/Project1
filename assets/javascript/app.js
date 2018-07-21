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



//CODE COMMENT OUT START

//create function to fill database with information based on zipcode provided
//filling the database is on hold



// //event listener for submit button
// $("#submitListing").on("click",function(){

//     event.preventDefault();

//     //can have some sort of validation, add this later
//     //still waiting on IDs for data entered by user
//     var tempName = $("#inputName").val().trim();
//     var tempStreet = $("#inputAddress").val().trim();
//     var tempCity = $("#inputCity").val().trim();
//     var tempState = $("#inputState").val().trim();
//     var tempZip = $("#inputZip").val().trim();
//     var tempFurnType = $("#inputFurnType").val().trim();
//     var tempFurnDims = $("#inputFurnDim").val().trim();
//     var tempFurnWeight = $("#ipnutFurnWeight").val().trim();

//     //since the condition will be a button, need to tweak this to get the attribute associated with the button
//     var tempFurnCond = $("#inputFurnCond").val();
//     // var tempPic = $("#furnPicLinkid").val();

//     enterData(tempName,tempStreet,tempCity,tempcity,tempState,tempZip,tempFurnType,tempFurnDims,tempFurnWeight,tempFurnCond);
        
        


//     });

//COMMENT OUT END

    






// for now just going to populate the listings column with the data every
//before doing this need to research if we can order the database using the zipcode searched
//if so i need to create a function that orders the database that is called everytime a user adds a listing or the page is refreshed
//this kills two birds with one stone



var ref =  database.ref("78745");


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