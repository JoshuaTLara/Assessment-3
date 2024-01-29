import marvels from './db.json' assert {type: 'json'}
// import phrases from './phrasedb.json' assert {type: 'json'}

let globalId = 4;

console.log('hit')

// the handlerFuctions will be referenced throughout and will allow us to reference them giving acess with out cluttering up code.
const handlerFunctions = {
    //the object below has a req which will be requested by other events, and the res will respond with the below response.
    // so when this is requested it will send the message and teh marvels which will come from the db.json object array.
    getAllMarvels: (req, res) => {
        res.send({
            message: "Here are the Marvel Characters",
            allMarvels: marvels
        })
    },
    //we will now add another funciton to add another marvel charater to the screen
    addMarvel: (req, res) => {
        // it will grab the name and picture from the post request object from main.js
        const marvelName = req.body.marvelName;
        const marvelPic = req.body.marvelPic;

        //Create a new marvel object, passing in the values from teh req object so the info gathered on the main.js page will be used here to acctually create the object like if it was coming from the db.json file
        const newMarvel = {
            id: globalId,
            name: marvelName,
            picture: marvelPic,
            votes: 0,
        };
        //now we need to add the new marvel object to our marvel array (called marvels) by pushing it
        marvels.push(newMarvel)
        
        globalId++
        //this sends back to the browser this information
        res.send({
            message: "Mavel added successfully",
            allMarvels: marvels,
        })
        
    },

    //now we will create the function that acctually does the deleting of the id and information that creates the card
    deleteMarvel: (req, res) => {
        //grab the marvel id from req.prams object
        const marvelId = req.params.id;
        //find the marvel object with the matching id from our marvel array
        // then remove it from the marvels array
        for( let i = 0; i < marvels.length; i++) {
            // interation through marvels, if a marvels id is a match then we will delete it with a .splice method
            if (marvels[i].id === +marvelId) {
                // + 5 === number(5)
                //so this will loop through and find the array matched with i, then the 1 means only one card be deleted and the break exits the loop immeditaly so we don't go back through and try and find it
                marvels.splice(i, 1)
                break;
            }    
        }
        //this will send a message back to the web browser that one the marvels have been deleted and the deleted marvel
        res.send({
            message: 'Marvel deleted',
            allMarvels: marvels,
        })
    },

    updateMarvel: (req, res) => {
        //grab teh id from req.params
        const marvelId = req.params.id
        //grab the type (upvote/downvote) from the req.body
        const voteType = req.body.voteType;

        //grab the index of the marvle using its id and the 'findIndex' array method'

        const marvelIdx = marvels.findIndex((marvel) => {
            return marvel.id === +marvelId
        })

        //based on the voteType, either increase or decrease the marvel.vote property
       if (voteType === "upvote") {
            marvels[marvelIdx].votes += 1
       } else if (voteType === "downvote") {
            marvels[marvelIdx].votes -= 1
       }
       // send a reqponse with all the marvels again ( marvels array will now have the new vote value of this marvel card)
       res.send ({
        message:"vote count updated",
        allMarvels: marvels,
       })
          
    },

    // updateH4: (req, res) => {
    //     const randomIndex = Math.floor(Math.random() * phrases.length);
    //     const updatedText = phrases[randomIndex];
    
    //     res.send ({
    //         message: "Phrase is updated",
    //         phrases: updatedText,
    //     })
    // }

}





//exports this is required to connect the controller page with the server page allow the fuctions to interact with the get requests
export default handlerFunctions;