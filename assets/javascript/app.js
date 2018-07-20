//this is a test, to make sure im in the right location
//hopefully this shit is working
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB0pMtOIhxz6BT26CaqP1xW2m6rVxMTFAo",
    authDomain: "group-project-d9732.firebaseapp.com",
    databaseURL: "https://group-project-d9732.firebaseio.com",
    projectId: "group-project-d9732",
    storageBucket: "",
    messagingSenderId: "252744545653"
};
firebase.initializeApp(config);

var database = firebase.database();

//this function will take the zipcode entered into the search bar and order the database based on that input
function orderDatabase(zipcode){



}


//create function to fill database with information based on zipcode provided

function enterData(n,str,c,st,z,ft,fd,fw,fc) {

    var count = 0;

        //check database to see if zip code user entered is already a node within the database
    database.ref().forEach(function(data){
        if(data.key == z){
            count++;
        }
    });

    //if zipcode does not exist within database, create new node for that zipcode 
    if(count === 0){



    //else zipcode exists and we can go to that node and save data there
    } else{

        // var newListingKey = database.ref().child(z).push().key;

        var listingData = {

            name: n,
            street: str,
            city: c,
            state: st,
            zipcode: z,
            furnType: ft,
            furnDim: fd,
            furnWeight: fw,
            furnCond: fc,

        }
        // Write the new listing data to the node with the existing zipcode.
        var updates = {};
        updates['/' + z + '/' + newListingKey] = listingData;
        return database.ref().update(updates);


    }



}

//event listener for submit button
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
    var tempFurnWeight = $("#ipnutFurnWeight").val().trim();

    //since the condition will be a button, need to tweak this to get the attribute associated with the button
    var tempFurnCond = $("#inputFurnCond").val();
    // var tempPic = $("#furnPicLinkid").val();

    enterData(tempName,tempStreet,tempCity,tempcity,tempState,tempZip,tempFurnType,tempFurnDims,tempFurnWeight,tempFurnCond);
        
        


    });


    

    // database.ref().push({

    //     name: tempName,
    //     street: tempStreet,
    //     city: tempCity,
    //     state: tempState,
    //     zip: tempZip,
    //     furniture: {
            
    //         type: tempFurnType,
    //         dims: tempFurnDims,
    //         weight: tempFurnWeight,
    //         cond: tempFurnCond,
    //         picture: tempPic,



    //     }



    // });





// for now just going to populate the listings column with the data every
//before doing this need to research if we can order the database using the zipcode searched
//if so i need to create a function that orders the database that is called everytime a user adds a listing or the page is refreshed
//this kills two birds with one stone
database.ref().on("value",function(snapshot){

    //this function will order the database based on
    orderDatabase();






}, function(errorObject){

    console.log("The load failed" + errorObject.node);
})