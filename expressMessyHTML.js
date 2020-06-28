const express = require('express')
const app = express()
const path = require('path');

var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://shubhsaras:shubhsaras38@moverzfax.2op18.mongodb.net/<dbname>?retryWrites=true&w=majority";


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, resp){
  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Let's Use EJS</title>
      </head>
      <body>
        <h1>Learning To Use EJS</h1>
      </body>
    </html>
  `

  resp.send(html)
})

app.get('/withEJS', function(req, resp){
  resp.render('firstEJSTemplate')
})


app.get('/withMoverPhno', function(req, resp){
var moverPhNo=[];
  //to list all documents
    mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
      if (error) {
        throw error;

      }

      var nodtst = databases.db("moverzFax");
      nodtst.collection("movers").find({}).toArray(function(err, totalmovers) {
        if (err) throw err;

        for (i = 0; i < totalmovers.length; i++) {
          let mover = totalmovers[i];
          moverPhNo.push(mover.moverPhno);
          console.log(mover.moverName + ", " + mover.moverPhno);
        }

        //console.log(result);
        databases.close();


          const welcomeText = "Welcome to EJS"

          resp.render('dataTemplate2', {
            viewVariable: "I'm available in the view as `viewVariable`",
            welcomeText: welcomeText,
            favoriteThings: moverPhNo
          })
      });
    });



})


app.get('/withMoverName', function(req, resp){
var moverNames=[];
  //to list all documents
    mongoClient.connect(url, { useUnifiedTopology: true },function(error, databases) {
      if (error) {
        throw error;

      }

      var nodtst = databases.db("moverzFax");
      nodtst.collection("movers").find({}).toArray(function(err, totalmovers) {
        if (err) throw err;

        for (i = 0; i < totalmovers.length; i++) {
          let mover = totalmovers[i];
          moverNames.push(mover.moverName);
          console.log(mover.moverDescription + ", " + mover.moverDescription);
        }

        //console.log(result);
        databases.close();


          const welcomeText = "Welcome to EJS"

          resp.render('dataTemplate', {
            viewVariable: "I'm available in the view as `viewVariable`",
            welcomeText: welcomeText,
            favoriteThings: moverNames
          })
      });
    });



})

app.listen(3000)
