let inputRegex = /(\d*\.?\d*\/?\d*\.?\d*)([A-Za-z]*)/;

function ConvertHandler() {
  this.getNum = function(input) {
    console.log('input:', input);
    let result;
    let match = input.match(/[.\/\d]+/);

    // Adicionado: verificar se o input é uma string vazia ou apenas contém espaços
    if (!input || !input.trim()) {
      return 'invalid number';
    }

    if (!match) {
      result = 1;
    } else {
      result = match[0];
      if ((result.match(/\//g) || []).length > 1) {
        console.log('More than one slash detected:', result);
        return 'invalid number';
      }

      if (result.includes("/")) {
        let values = result.split("/");
        if (values.length != 2 || isNaN(values[0]) || isNaN(values[1]) || parseFloat(values[0]) == 0 || parseFloat(values[1]) == 0){
          console.log('Invalid fraction detected:', values);
          return 'invalid number';
        }
        result = parseFloat(values[0])/parseFloat(values[1]);
      } else {
        if (isNaN(result) || result == 0) {
          return 'invalid number';
        }
        result = parseFloat(result);
      }    
    }

    if(isNaN(result) || !isFinite(result)){
      console.log('Invalid number detected:', result);
      return 'invalid number';
    }

    console.log('Resulting number:', result);
    return result;
  };
      
  this.getUnit = function(input) {
    if (!input) return 'invalid unit';
  
    let match = input.match(inputRegex);
    if (!match) return 'invalid unit';
  
    let result = match[2];
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    result = result.toLowerCase();
    if(result === 'l') return 'L'; // Return 'L' for liters
    if(!validUnits.includes(result)){
      return 'invalid unit';
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
  
    if(initUnit !== 'L'){
      initUnit = initUnit.toLowerCase();
    }
    
    return units[initUnit];
  };
    
  this.spellOutUnit = function(unit) {
    const units = {
      'gal': 'gallons',
      'L': 'litres',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return units[unit];
  };
    
  this.convert = function(initNum, initUnit) {
    const conversions = {
      'gal': 3.78541,
      'L': 1/3.78541,
      'l': 1/3.78541, // Add this line
      'mi': 1.60934,
      'km': 1/1.60934,
      'lbs': 0.453592,
      'kg': 1/0.453592
    };
    let result = initNum * conversions[initUnit];
    return parseFloat(result.toFixed(5));
  };
    
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
