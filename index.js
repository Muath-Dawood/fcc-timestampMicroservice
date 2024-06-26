// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  if(!req.params.date) {
    console.log("no date param")
    res.json({
      utc: new Date(Date.now()).toUTCString(),
      unix: new Date(Date.now()).getTime()
    })
  }else {

    const notUnix = !/^[0-9]+$/g.test(req.params.date)
  
    if(notUnix) {
      if(new Date(req.params.date).toString() === 'Invalid Date') {
        console.log("invalid date string")
        res.json({
          error: 'Invalid Date'
        })
      }else {
        console.log("valid date string")
        res.json({
          utc: new Date(req.params.date).toUTCString(),
          unix: new Date(req.params.date).getTime()
        })
      }
    }else {
      console.log("valid date number")
      res.json({
        utc: new Date(parseInt(req.params.date)).toUTCString(),
        unix: new Date(parseInt(req.params.date)).getTime()
      })
    }
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
