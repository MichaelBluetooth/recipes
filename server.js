var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var INGREDIENTS_COLLECTION = "ingredients";
var RECIPES_COLLECTION = "recipes";
var GROCERYITEMS_COLLECTION = "groceryitems"
var GROCERYPACKAGES_COLLECTION = "grocerypackages"
var UNITSOFMEASURE_COLLECTION = 'unitsofmeasure'

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
  res.status(code || 500).json({ "error": message });
}

/*  "/api/ingredients"
 *    GET: finds all ingredients
 *    POST: creates a new ingredients
 */

app.get("/api/ingredients", function (req, res) {
  db.collection(INGREDIENTS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get ingredients.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/ingredients", function (req, res) {
  var newIngredient = req.body;
  newIngredient.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(INGREDIENTS_COLLECTION).insertOne(newIngredient, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new ingredient.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.post("/api/ingredients/bulk", function (req, res) {
  var validationError = false;

  req.body.forEach(newIngredient => {
    newIngredient.createDate = new Date();
    if (!newIngredient.name) {
      validationError = true;
    }
  });

  if (validationError) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(INGREDIENTS_COLLECTION).insertMany(req.body, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new ingredient.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/ingredients/:id"
 *    GET: find ingredient by id
 *    PUT: update ingredient by id
 *    DELETE: deletes ingredient by id
 */

app.get("/api/ingredients/:id", function (req, res) {
  db.collection(INGREDIENTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get ingredient");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/ingredients/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(INGREDIENTS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update ingredient");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/ingredients/:id", function (req, res) {
  db.collection(INGREDIENTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete ingredient");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// RECIPE ROUTES BELOW

app.get("/api/recipes", function (req, res) {
  db.collection(RECIPES_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get recipes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/recipes", function (req, res) {
  var newRecipe = req.body;
  newRecipe.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(RECIPES_COLLECTION).insertOne(newRecipe, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new recipe.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/api/recipes/:id", function (req, res) {
  db.collection(RECIPES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get recipe");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/recipes/:id", function (req, res) {
  delete req.body._id;
  var updateDoc = { $set: req.body };

  db.collection(RECIPES_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update recipe");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/recipes/:id", function (req, res) {
  db.collection(RECIPES_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete recipe");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

//UNITS OF MEASURE ROUTES BELOW

app.get("/api/unitsofmeasure", function (req, res) {
  db.collection(UNITSOFMEASURE_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get groceryitems.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/unitsofmeasure", function (req, res) {
  var newUnit = req.body;
  newUnit.createDate = new Date();

  if (!newUnit.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(UNITSOFMEASURE_COLLECTION).insertOne(newUnit, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new unit.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.post("/api/unitsofmeasure/bulk", function (req, res) {
  var validationError = false;

  req.body.forEach(newUnit => {
    newUnit.createDate = new Date();
    if (!newUnit.name) {
      validationError = true;
    }
  });

  if (validationError) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(UNITSOFMEASURE_COLLECTION).insertMany(req.body, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new unit.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/api/unitsofmeasure/:id", function (req, res) {
  db.collection(UNITSOFMEASURE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get unit");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/unitsofmeasure/:id", function (req, res) {
  delete req.body._id;
  var updateDoc = { $set: req.body };

  db.collection(UNITSOFMEASURE_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update unit");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/unitsofmeasure/:id", function (req, res) {
  db.collection(UNITSOFMEASURE_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete unit");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

//GROCERYITEM ROUTES BELOW

app.get("/api/groceryitems", function (req, res) {
  db.collection(GROCERYITEMS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get groceryitems.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/groceryitems", function (req, res) {
  var newGroceryitem = req.body;
  newGroceryitem.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(GROCERYITEMS_COLLECTION).insertOne(newGroceryitem, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new groceryitem.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/api/groceryitems/:id", function (req, res) {
  db.collection(GROCERYITEMS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get groceryitem");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/groceryitems/:id", function (req, res) {
  delete req.body._id;
  var updateDoc = { $set: req.body };

  db.collection(GROCERYITEMS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update groceryitem");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/groceryitems/:id", function (req, res) {
  db.collection(GROCERYITEMS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete groceryitem");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.post("/api/groceryitems/bulk", function (req, res) {
  var validationError = false;

  req.body.forEach(newGroceryItem => {
    newGroceryItem.createDate = new Date();
    if (!newGroceryItem.name) {
      validationError = true;
    }
  });

  if (validationError) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(GROCERYITEMS_COLLECTION).insertMany(req.body, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new GroceryItem.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

//GROCERYPACKAGE ROUTES BELOW

app.get("/api/grocerypackages", function (req, res) {
  db.collection(GROCERYPACKAGES_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get grocerypackages.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/grocerypackages", function (req, res) {
  var newGroceryPackage = req.body;
  newGroceryPackage.createDate = new Date();

  if (!req.body.barcode) {
    handleError(res, "Invalid user input", "Must provide a barcode.", 400);
  } else {
    db.collection(GROCERYPACKAGES_COLLECTION).insertOne(newGroceryPackage, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new grocerypackage.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/api/grocerypackages/search", function (req, res) {
  var query = JSON.parse(req.query.q);
  for(var key in query){
    if(query.hasOwnProperty(key)){
      query[key] = new RegExp(query[key]);
    }
  }
  db.collection(GROCERYPACKAGES_COLLECTION).find(query).toArray(function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get grocerypackage");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/api/grocerypackages/:id", function (req, res) {
  db.collection(GROCERYPACKAGES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get grocerypackage");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/grocerypackages/:id", function (req, res) {
  delete req.body._id;
  var updateDoc = { $set: req.body };

  db.collection(GROCERYPACKAGES_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update grocerypackage");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/grocerypackages/:id", function (req, res) {
  db.collection(GROCERYPACKAGES_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete grocerypackage");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.post("/api/grocerypackages/bulk", function (req, res) {
  var validationError = false;

  req.body.forEach(newGroceryPackage => {
    newGroceryPackage.createDate = new Date();
    if (!newGroceryPackage.barcode) {
      validationError = true;
    }
  });

  if (validationError) {
    handleError(res, "Invalid user input", "Must provide a barcode.", 400);
  }

  db.collection(GROCERYPACKAGES_COLLECTION).insertMany(req.body, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new grocerypackage");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});