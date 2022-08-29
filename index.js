// index.js
// where your node app starts

// init project
const express = require('express');
require('dotenv').config()     
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  if(!req.params.date) {
    const date = new Date()
    const unixDate = date.getTime()
    res.json({"unix": unixDate, "utc": date.toUTCString()})
  }
  
  if(!isNaN(req.params.date)){
    const date = new Date(+(req.params.date));
    const unixDate = req.params.date
    res.json({"unix": unixDate,"utc": date.toUTCString()})
  }
  const date = new Date(req.params.date)
  if(date.toUTCString() === "Invalid Date"){
    res.json({"error": date.toUTCString()})
  } else {
        const unixDate = date.getTime()
        res.json({"unix": unixDate,"utc": date.toUTCString()})
      }
})


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
