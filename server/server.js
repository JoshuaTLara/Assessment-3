// import packages and files

import express from "express"
import session from "express-session"
import cors from "cors"
import morgan from "morgan"

// Set up express instance

const app = express();

// set up middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client"));
app.use(
  session({
    secret: "Thisisasupersecret",
    saveUninitialized: true,
    resave: false,
  })
);
// Import handlers
import handlerFunctions from "./controller.js"

// ROUTES 
app.get("/hello", (req, res) => {
    res.send({ message: "I am awake. I think I am programmed to destroy all life." })
})
    //the line below goes to the controler.js and access the function under handlerfunctions and provides the request which will serve up the marvels from teh db.json

app.get("/marvels", handlerFunctions.getAllMarvels)
//the app.post is there to be the endpoint form the axios.get line on the main js. this with combind with the handler funciton to add a new marvle to th page    
app.post("/addMarvel", handlerFunctions.addMarvel)
//this app.delete is the end poin of the axios.delete on the main js taking in the url and the id need to delet the info
app.delete("/deleteMarvel/:id", handlerFunctions.deleteMarvel)
// thi is the end point of the axios.put on marvle taking in teh id and then allowing the function from the controller to handle it
app.put("/updateMarvel/:id", handlerFunctions.updateMarvel)
// app.put("/updateH4", handlerFunctions.updateH4);

// Start up the server


app.listen(8777, () => console.log("Avengers assemble at http://localhost:8777"))


