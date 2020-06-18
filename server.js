// DEPENDENCIES
// ================================================================================

// establishes the npm packages we will need to use to provide functionality to our code
var express = require("express");

// EXPRESS CONFIGURATION
// ================================================================================

// creates the express server
var app = express();

// sets port to be used in our listener
var PORT = process.env.PORT || 3000;

// allows express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// this part of the code helps for serving static files in express using the route middleware function
app.use(express.static('public'));

// ROUTER
// ================================================================================

// these routes direct our server to particular files that will provide instructions on how to respond or request data 
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
// ================================================================================

// initiates the start of our code when we run node
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});