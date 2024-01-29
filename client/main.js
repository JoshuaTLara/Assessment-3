console.log('Hello Marvel World')


const marvelDisplay = document.querySelector("#marvelDisplay")
const marvelForm = document.querySelector("form")
// const h4Element = document.getElementById("myH4")
// const updateButton = document.getElementById("updateButton")



axios.get("/hello").then((res) => console.log(res.data.message))


// want to create "cards" for each Marvelchar from our database
// Assume that this function will be called passing in a Marvelchar object from teh dattabase equal to the paramater

const createMarvelCard = (marvelObj) => {
    //first create a new section element to insert to the html page that we can refrence over and over
   // this const creates a section element that can be accessed by marvelCard class
    const newMarvelCard = document.createElement("section")
    // add a class named "marvelCard"
    // this class is also accessed on the css page
    newMarvelCard.className = "marvelCard"
    // add the needed innerHTML to make new marvelCard for each one
    // marvelObj refrenced is refering to the array of objects we are taking from the db.json file
   // and anything after the obj. is reffering to the value on that page
    newMarvelCard.innerHTML = `
        <img src="${marvelObj.picture}" />
        <p>${marvelObj.name}</p>

        <section>
        <button onclick="updateMarvel(${marvelObj.id}, 'downvote')">-</button>
        Popularity: ${marvelObj.votes}
        <button onclick="updateMarvel(${marvelObj.id}, 'upvote')">+</button>
         
        <br>
        
        <button onclick="deleteMarvel(${marvelObj.id})">Delete Me</button>
    `;
    //This references the marvel display in the html div id and then appendchild means any and all child elements are effected by this.
    // basiclly meaning that the new card will insert at the div point on the html document
    marvelDisplay.appendChild(newMarvelCard)
    
};

// now inorder for a marvel card to be created we need to loop through the array and create each card.
const displayAllMarvels = (marvelArr) => {
    for (let i = 0; i < marvelArr.length; i++) {
        // at each loop through the array stop at each object and create a new card passing in the info
        createMarvelCard(marvelArr[i])
    }
}

// okay so now we have a tool to loop through the array we need the array info itself, we will build a function to reach out to the server and grab the drink array

const getAllMarvels = () => {
    //axios.get calls to the server page to its end point, then once it gets teh data it can then run the rest of the function and display it on the page
    axios.get("/marvels").then((res) => {
        displayAllMarvels(res.data.allMarvels)
    })
}
//this funtion is to allow the user to submitt the input and create new cards.
const handleSubmit = (evt) => {
    //the evt.prevent defalut is to keep the page from reloading everytime there is a new card created
    evt.preventDefault();
    // you need to define two varibles that will be used in the function that can get the info from the input
    let name = document.getElementById("marvelName");
    let marvelImg = document.getElementById("marvelImg");    

    // you need to create a body object for a post request when sending data to the server.
    let bodyObj = {
        // these two will go to the html and get the the info following the namve and value
        marvelName: name.value,
        marvelPic: marvelImg.value,
    }
    //this setting to an empty string will allow it to display the new values in the new card
    marvelDisplay.innerHTML = "";
    name.value = "";
    marvelImg.value = "";
// this axios.post is taking in the url and the bodyObj that is the configuration or data object to take to the server as out payload that will eventually be displayed on the page
    axios.post('/addMarvel', bodyObj)
   //after it does this then it will display the marvels and the info on the page.
    .then((res) => {
        displayAllMarvels(res.data.allMarvels)
    });
}

// now we create a funciton to delete a marvel card

const deleteMarvel = (id) => {

    //send an adios delete request inculding the id as a req.pram. this will allow the info we have populated on the page to be found by their id and deleted
    axios.delete(`/deleteMarvel/${id}`).then((res) => {
       // after it sends that request and comes back, then we will console log the data, don't think this is nesscary but not sure look in the consle to see if it was indeed firing
        console.log(res.data)
        //so this is clearing the innerHTML content and displaying the new card as empty leaving a blank space there
        marvelDisplay.innerHTML = ""
        displayAllMarvels(res.data.allMarvels)
    })
}

//we wil create a function taht updates the popularity votes of the marvel card and wither it is up or down voted
const updateMarvel = (id, type) => {
    let bodyObj = {
        voteType: type
    }

    //send a put request providing the bodyObj and a param for the marvels id
    //this takes in the id and the type of voting after finding it it will then change the inner look of the page
    axios.put(`/updateMarvel/${id}`, bodyObj).then((res) => {
        marvelDisplay.innerHTML = ""
        displayAllMarvels(res.data.allMarvels)
    })
}

// // create a button funciton that will update the saying in h4 heading
// document.addEventListener('DOMContentLoaded', () => {
//     const h4Element = document.getElementById('h4-element');
//     const updateButton = document.getElementById('update-button');

//     updateButton.addEventListener('click', () => {
//         axios.put('/updateH4').then((response) => {
//             const newText = response.data.updatedText;
//             h4Element.textContent = newText;
//         });
//     });
// });



// add an event listener

marvelForm.addEventListener('submit', handleSubmit)

// Invoke it to get it all started!!!!
getAllMarvels()