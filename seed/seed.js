const request = require("request");
const unitsOfMeasureByName = {};
const groceryItemsByName = {};

function loadUnits() {
    var promise = new Promise((resolve) => {
        const units = require('./unitsofmeasure.json');
        request({
            url: 'https://fathomless-depths-15523.herokuapp.com/api/unitsofmeasure/bulk',
            method: 'POST',
            json: units
        }, function (error, httpResponse, body) {            
            body.forEach(newUnit => {
                unitsOfMeasureByName[newUnit.name] = newUnit;
            });
            resolve();
        });
    });
    return promise;
}

function loadGroceryItems() {
    var promise = new Promise((resolve) => {
        const groceryItems = require('./groceryitems.json');
        request({
            url: 'https://fathomless-depths-15523.herokuapp.com/api/groceryitems/bulk',
            method: 'POST',
            json: groceryItems
        }, function (error, httpResponse, body) {
            body.forEach(newItem => {
                groceryItemsByName[newItem.name] = newItem;
            });
            resolve();
        });
    });
    return promise;
}

function loadGroceryPackages() {
    var promise = new Promise((resolve) => {
        const groceryPackages = require('./grocerypackages.json');
        groceryPackages.forEach(package => {
            package.unit = unitsOfMeasureByName[package.unit.name],
                package.groceryItem = groceryItemsByName[package.groceryItem.name]
        });
        request({
            url: 'https://fathomless-depths-15523.herokuapp.com/api/grocerypackages/bulk',
            method: 'POST',
            json: groceryPackages
        }, function (error, httpResponse, body) {
            resolve();
        });
    });
    return promise;
}

loadUnits().then(
    () => loadGroceryItems().then(
        () => loadGroceryPackages().then(
            () => process.exit(0)
        )
    )
);


// const packages = require('./grocerypackages.json');
