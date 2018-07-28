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
   $("#inputFurnCond").val('');
   $("#inputComments").val('');



       
       


   });
});