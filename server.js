const express = require('express'); //state that we are using express (don't need file path because it's in the node_modules folder)
const morgan = require('morgan'); //bring in Morgan middleware under variable "morgan"

const hostname = 'localhost';
const port = 3000;

const app = express(); //"express()" function returns a express server application that will now be available to us under name "app"
app.use(morgan('dev')); //"use" method, instead of writing the callback function in line, insert the Morgan middleware by using function "morgan" in the argument. Pass 'dev' into morgan function which will set it up to put out extra info
app.use(express.json()); //when the server receives requests with JSON formatted data in the body, this middle ware funciton will handle parsing the JSON data into JS properties of the request object so the data can be used in JS.

//Add support for REST API endpoints
app.all('/campsites', (req, res, next) => { //Routing method "app.all" a method that is a catch all for all HTTP verbs. It will set some properties on the response object that will be used as defaluts for all routing methods on this path. All routing methods take a path as the first argument. Any HTTP requests with this path will trigger this method. Second parameter is a callback function with parameters as shown. 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');//going to send back plain text in the response body
    next(); //call 'next' function, it will pass control of the application routing to the next relevent routing method, otherwise, routing would stop here
});

app.get('/campsites', (req, res) => { //route for GET request to the path /campsites.
    res.end('Will send all the campsites to you'); //"statusCode" and header are set by ".all" method, so just need the ".end" here to send a text string (will add more later)
});

app.post('/campsites', (req, res) => {//route for POST request to the path /campsites
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`); //express.JSON middleware will automatically set the request objects to be JS readable
});

app.put('/campsites', (req, res) => {//route for PUT request to the path /campsites
    res.statusCode = 403; //Will reject and send 403 message becuase our app will not be supporting PUT requests
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {//route for DELETE request to the path /campsites
    res.end('Deleting all campsites');
});

//Add four more endpoints with route parameters ":"
app.get('/campsites/:campsiteId', (req, res) => { //the ":" will allow us to store whatever the client sends as a route parameter called "CampsiteId" to the request object
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => { //POST request will not be supported on this path, but server will respond to it
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => { //Support a "PUT" request on particular campsites, send a multi-line response
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);//First line of the response
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);//End of the resposne and Second line of the response all in one command
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public')); //Set up express to serve files from the public folder. Pass the "use" function the middleware function "express.static" and give it an argument "__dirname + '/public'".  "__dirname" is a special variable in Node, whenever used, it will refer to the absolue path of the current directory that the file is in

//For initial practice, set up server to return the same response to any request
app.use((req, res) => { //"use" method, it can take a callback function, which is a special type of funciton that express calls a middleware function. A middleware funciton in express has access to three pramaters. "req" request object, "res" response object, "next" which is a function.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); //body message with an inline HTML document.
});

//Create a server and start listening to it
app.listen(port, hostname, () => { //"listen" method both creates an instance of the http server class and starts listening to it. Pass in "port" and "hostname" as well as a callback function to console.log information
    console.log(`Server running at http://${hostname}:${port}/`);
});