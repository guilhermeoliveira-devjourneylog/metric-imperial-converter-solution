/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32, 'Error in getNum with whole number input');
      done();
    });

    test("Decimal Input", function(done) {
      var input = "3.25mi";
      assert.equal(convertHandler.getNum(input), 3.25, 'Error in getNum with decimal input');
      done();
    });

    test("Fractional Input", function(done) {
      var input = "12/8mi";
      assert.equal(convertHandler.getNum(input), 1.5, 'Error in getNum with fractional input');
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      var input = "27/5.4mi";
      assert.equal(convertHandler.getNum(input), 5, 'Error in getNum with fractional input with decimal');
      done();
    });

    test("Invalid Input (double fraction)", function(done) {
      var input = "3/7.2/4L";
      assert.equal(convertHandler.getNum(input), "invalid number", 'Error in getNum with double fraction input');
      done();
    });

    test("No Numerical Input", function(done) {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1, 'Error in getNum with no numerical input');
      assert.equal(convertHandler.getUnit(input), "kg", 'Error in getUnit with no numerical input');
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "L", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
      var expected = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(32 + ele), expected[i], `Error in getUnit with input ${ele}`);
      });
      done();
    });

    test("Unknown Unit Input", function(done) {
      let input = "32g";
      assert.equal(convertHandler.getUnit(input), "invalid unit", 'Error in getUnit with unknown unit input');
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "L", "mi", "km", "lbs", "kg"];
      var expected = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expected[i], `Error in getReturnUnit with input ${ele}`);
      });
      done(); 
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      let input = ["gal", "L", "mi", "km", "lbs", "kg"];
      let expect = ["gallons", "litres", "miles", "kilometers", "pounds", "kilograms"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i], `Error in spellOutUnit with input ${ele}`);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1, 'Error in convert from Gal to L'); 
      done();
    });

    test("L to Gal", function(done) {
      var input = [5, "L"];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1, 'Error in convert from L to Gal'); 
      done();
    });

    test("Mi to Km", function(done) {
      var input = [5, "mi"];
      var expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1, 'Error in convert from Mi to Km'); 
      done();
    });

    test("Km to Mi", function(done) {
      var input = [5, "km"];
      var expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1, 'Error in convert from Km to Mi'); 
      done();
    });

    test("Lbs to Kg", function(done) {
      var input = [5, "lbs"];
      var expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1, 'Error in convert from Lbs to Kg'); 
      done();
    });

    test("Kg to Lbs", function(done) {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1, 'Error in convert from Kg to Lbs'); 
      done();
    });
  });
});
