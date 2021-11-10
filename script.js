function setDemand(){
  if(averageDeterminantsOfPED > 0){
    calculator.setExpression({ id: 'demand', latex: `y=-${averageDeterminantsOfPED}(x-${averageDeterminantsOfDemand}) + 10` });
  }
  else if(averageDeterminantsOfPED==0){
    calculator.setExpression({ id: 'demand', latex: `y=-(x-${averageDeterminantsOfDemand}) + 10` });
  }
  else{
    calculator.setExpression({ id: 'demand', latex: `y=-((10+${averageDeterminantsOfPED})/10)(x-${averageDeterminantsOfDemand}) + 10` });
  }
}

function setSupply(){
  if(averageDeterminantsOfPES > 0){
    calculator.setExpression({ id: 'supply', latex: `y=${averageDeterminantsOfPES}(x-${averageDeterminantsOfSupply})` });
  }
  else if(averageDeterminantsOfPES==0){
    calculator.setExpression({ id: 'supply', latex: `y=(x-${averageDeterminantsOfSupply})` });
  }
  else{
    console.log(`y=((10+${averageDeterminantsOfPES})/10)(x-${averageDeterminantsOfSupply})`)
    calculator.setExpression({ id: 'supply', latex: `y=((10+${averageDeterminantsOfPES})/10)(x-${averageDeterminantsOfSupply})` });
  }
}

let determinantsOfDemand = {
  substitutes: {
    correlation: -1,
    value: 0
  },
  complements: {
    correlation: 1,
    value: 0
  },
  population: {
    correlation: 1,
    value: 0
  },
  sentiment: {
    correlation: 1,
    value: 0
  },
  normalIncome: {
    correlation: 1,
    value: 0
  },
  inferiorIncome: {
    correlation: -1,
    value: 0
  }
}

let averageDeterminantsOfDemand = 0

function changeDeterminantsofDemand(id, val){
  determinantsOfDemand[id]["value"] = parseInt(val);
  console.log(determinantsOfDemand)
  for(let x = 0; x < Object.keys(determinantsOfDemand).length; x++){
    averageDeterminantsOfDemand += (determinantsOfDemand[Object.keys(determinantsOfDemand)[x]]["value"]) * determinantsOfDemand[Object.keys(determinantsOfDemand)[x]]["correlation"]
  }
  averageDeterminantsOfDemand = averageDeterminantsOfDemand / Object.keys(determinantsOfDemand).length
  setDemand()
}

let determinantsOfSupply = {
  productionCost: {
    correlation: 1,
    value: 0
  },
  subsidyTax: {
    correlation: 1,
    value: 0
  }
}

let averageDeterminantsOfSupply = 0

function changeDeterminantsofSupply(id, val){
  determinantsOfSupply[id]["value"] = parseInt(val);
  for(let x = 0; x < Object.keys(determinantsOfSupply).length; x++){
    averageDeterminantsOfSupply += (determinantsOfSupply[Object.keys(determinantsOfSupply)[x]]["value"]) * determinantsOfSupply[Object.keys(determinantsOfSupply)[x]]["correlation"]
  }
  averageDeterminantsOfSupply = averageDeterminantsOfSupply / Object.keys(determinantsOfSupply).length
  calculator.setExpression({ id: 'supply', latex: `y=x-${averageDeterminantsOfSupply}` });
}

let determinantsOfPED = {
  necessity: {
    correlation: -1,
    value: 0
  },
  substitutes: {
    correlation: -1,
    value: 0
  },
  incomePercent: {
    correlation: -1,
    value: 0
  }
}

let averageDeterminantsOfPED = 0

function changeDeterminantsofPED(id, val){
  determinantsOfPED[id]["value"] = parseInt(val);
  for(let x = 0; x < Object.keys(determinantsOfPED).length; x++){
    averageDeterminantsOfPED += (determinantsOfPED[Object.keys(determinantsOfPED)[x]]["value"]) * determinantsOfPED[Object.keys(determinantsOfPED)[x]]["correlation"]
  }
  averageDeterminantsOfPED = averageDeterminantsOfPED / Object.keys(determinantsOfPED).length
  setDemand()
}

let determinantsOfPES = {
  stockable: {
    correlation: 1,
    value: 0
  },
  mobility: {
    correlation: 1,
    value: 0
  },
  time: {
    correlation: -1,
    value: 0
  }
}

let averageDeterminantsOfPES = 0

function changeDeterminantsofPES(id, val){
  determinantsOfPES[id]["value"] = parseInt(val);
  for(let x = 0; x < Object.keys(determinantsOfPES).length; x++){
    averageDeterminantsOfPES += (determinantsOfPES[Object.keys(determinantsOfPES)[x]]["value"]) * determinantsOfPES[Object.keys(determinantsOfPES)[x]]["correlation"]
  }
  averageDeterminantsOfPES = averageDeterminantsOfPES / Object.keys(determinantsOfPES).length
  setSupply()
}


let elt = document.getElementById('calculator');

let calculator = Desmos.GraphingCalculator(elt, { keypad: false, expressions: false, settingsMenu: false, xAxisNumbers: false, yAxisNumbers: false, zoomButtons: false, lockViewport: true });

calculator.setMathBounds({
  left: 0,
  right: 10,
  bottom: 0,
  top: 10
});

calculator.setExpression({ id: 'supply', latex: 'y=x', label: 'test', showLabel: true });

calculator.setExpression({ id: 'demand', latex: 'y=-x+10' });