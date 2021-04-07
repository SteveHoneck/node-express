const express = require('express'); //state that we are using express (don't need file path because it's in the node_modules folder)

const hostname = 'localhost';
const port = 3000;

const app = express(); //"express()" function returns a express server application that will now be available to us under name "app"

//For initial practice, set up server to return the same response to any request
app.use((req, res) => { //"use" method, it can take a callback function, which is a special type of funciton that express calls a middleware function. A middleware funciton in express has access to three pramaters. "req" request object, "res" response object, "next" which is a function.
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); //body message with an inline HTML document.
});

//Create a server and start listening to it
app.listen(port, hostname, () => { //"listen" method both creates an instance of the http server class and starts listening to it. Pass in "port" and "hostname" as well as a callback function to console.log information
    console.log(`Server running at http://${hostname}:${port}/`);
});