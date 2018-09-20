var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var INGREDIENTS_COLLECTION = "ingredients";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// INGREDIENTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/ingredients"
 *    GET: finds all ingredients
 *    POST: creates a new ingredients
 */

app.get("/api/ingredients", function(req, res) {
  db.collection(INGREDIENTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get ingredients.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/ingredients", function(req, res) {
  var newIngredient = req.body;
  newIngredient.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(INGREDIENTS_COLLECTION).insertOne(newIngredient, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new ingredient.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/ingredients/:id"
 *    GET: find ingredient by id
 *    PUT: update ingredient by id
 *    DELETE: deletes ingredient by id
 */

app.get("/api/ingredients/:id", function(req, res) {
  db.collection(INGREDIENTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get ingredient");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/ingredients/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(INGREDIENTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update ingredient");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/ingredients/:id", function(req, res) {
  db.collection(INGREDIENTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete ingredient");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});