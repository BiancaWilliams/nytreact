const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//mongoose promise
mongoose.Promise = global.Promise;
//connect to mongo DB
mongoose.connect (
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient:true
 } 
);


/*BEGINNING DB */
const db = require('./models')
const {Article} = db
/*END DB*/

console.log(article)
/*routes*/
app.post("/api/saved", (req, res) =>{
  //get the post object
  var article = req.body
  //call Article.create
  Article.create(article)
  .then(() => {
    res.json(article)
  })
  .catch((err)) => {
res.json(err)
  }
})


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
