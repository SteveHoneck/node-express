//This module contains code for handling REST API endpoints for campsites and campsites/campsiteId
const express = require('express');
const campsiteRouter = express.Router();//To create a new express router, set up a new const and assign to it a call to the "express.Router" method. Gives us an object called "campsiteRouter" that we can use with express routing methods

campsiteRouter.route('/') //Pass argument of a path to the "route" method, path is just a forward slash. It is not "campsites" because that is set up in "server.js"
//Add support for REST API endpoints. Chain all these methods to the "route" method using the ".", that way the first argument which would normally be the path "/campsites" is no longer needed because it is provided by the ".route" method's argument.
.all((req, res, next) => { //Routing method "app.all" a method that is a catch all for all HTTP verbs. It will set some properties on the response object that will be used as defaluts for all routing methods on this path. All routing methods take a path as the first argument. Any HTTP requests with this path will trigger this method. Second parameter is a callback function with parameters as shown. 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');//going to send back plain text in the response body
    next(); //call 'next' function, it will pass control of the application routing to the next relevent routing method, otherwise, routing would stop here
})
.get((req, res) => { //route for GET request to the path /campsites.
    res.end('Will send all the campsites to you'); //"statusCode" and header are set by ".all" method, so just need the ".end" here to send a text string (will add more later)
})
.post((req, res) => {//route for POST request to the path /campsites
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`); //express.JSON middleware will automatically set the request objects to be JS readable
})
.put((req, res) => {//route for PUT request to the path /campsites
    res.statusCode = 403; //Will reject and send 403 message becuase our app will not be supporting PUT requests
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {//route for DELETE request to the path /campsites
    res.end('Deleting all campsites');
});

module.exports = campsiteRouter;