// DOM
let numbers = document.getElementsByClassName("number");
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let num3 = document.getElementById("num3");
let num4 = document.getElementById("num4");
let num5 = document.getElementById("num5");
let num6 = document.getElementById("num6");
let num7 = document.getElementById("num7");
let num8 = document.getElementById("num8");
let num9 = document.getElementById("num9");
let num0 = document.getElementById("num0");
let dec = document.getElementById("dec");

let operators = document.getElementsByClassName("operator");
let addBtn = document.getElementById("addBtn");
let subBtn = document.getElementById("subBtn");
let mulBtn = document.getElementById("mulBtn");
let divBtn = document.getElementById("divBtn");
let acBtn = document.getElementById("acBtn");
let eqlsBtn = document.getElementById("eqlsBtn");

let displayValue = document.getElementById("displayValue");
let displayDiv = document.getElementById("displayDiv");
let displayDummy = document.getElementById("displayDummy");

let firstOperand = null;
let secondOperand = null;
let total = null;

let previousOperator = undefined;
let globalOperator = undefined;


let operatorActive = false;
let lastButton;



[...numbers].forEach(elem => elem.addEventListener('click', enterNum));
function enterNum(e) {

  displayDummy.remove();

  if (lastButton === "AC") {
  
    total = null;
    displayValue.textContent = 0;
    displayValue.textContent = "";
    displayDiv.appendChild(displayValue);
    lastButton = "number";
  }


if (operatorActive === false) {
  // Adds to display value  (Maybe check here if display value contains "." if so, disable decimal button)
  displayValue.textContent += e.target.textContent; 
}  else {
  // Wipes display and lets you start a new display value after pressing an operator 
  operatorActive = false;
  displayValue.textContent = "";
  displayValue.textContent += e.target.textContent;
  };

  console.log("Display Value", e.target.textContent);
  console.log(total, "total")
  console.log(secondOperand, "secondOperand")
};



[...operators].forEach(elem => elem.addEventListener('click', enterOperator));
function enterOperator(e) {

let symbol = e.target.textContent;

operatorActive = true;

secondOperand = parseFloat(displayValue.textContent);

if (symbol === "+") globalOperator = "add";
if (symbol === "-") globalOperator = "subtract";
if (symbol === "*") globalOperator = "multiply";
if (symbol === "/") globalOperator = "divide";
if (symbol === "=") lastButton = "equals";


if (symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/") {

  if (secondOperand > total && total === 0) total = secondOperand;

  console.log("Operator Chain Path")
  equals("OperatorChain");

} else if (symbol === "=" && globalOperator === undefined) {

  console.log("NO GLOBAL OPERATOR BEFORE EQUALS")
  displayDummy.remove();
  displayValue.textContent = 0;

  equals();

} else if (symbol === "=") {
    console.log("Equals Path")
    equals();
  }; 

  console.log(total, "total")
  console.log(secondOperand, "secondOperand")
};
 


function equals(arg1) {

operatorActive = true;

if (previousOperator === undefined) previousOperator = globalOperator;

if (arg1 === "OperatorChain") {
    
  if (lastButton === "equals") {
    displayValue.textContent = total;
    lastButton = "";
    
    } else {
      secondOperand = parseFloat(displayValue.textContent);
      total = operate(total, secondOperand, previousOperator);
    }

} else {

  secondOperand = parseFloat(displayValue.textContent);
  total = operate(total, secondOperand, globalOperator);
};

previousOperator = globalOperator;
displayValue.textContent = parseFloat(total);

console.log(total, "total")
console.log(secondOperand, "second operand")
};


function operate(a, b, operator) {

if (globalOperator === undefined) return 0;

if (operator === "add") {
  console.log(total, "total")
  console.log(secondOperand, "secondOperand")

  return add(a, b);
  } else if (operator === "subtract") {
  return subtract(a, b); 
  } else if (operator === "multiply") {
  return multiply(a, b);
  } else if (operator === "divide") {
  return divide(a, b);
  };
};


function add(a, b) {
  console.log("Add was called: ", "Total (First Operand)", a, "Second Opperand: ",  b);
  return a + b;
};

function subtract(a, b) {
  console.log("Subtract was called: ", "Total (First Operand)", a, "Second Opperand: ",  b);
  if ( a === null) {
      return b - a 
  } else {
      return a - b;
  };
};

function multiply(a, b) {
  console.log("Multiply was called: ", "Total (First Operand)", a, "Second Opperand: ",  b);
  if (a * b === 0) { 
      return b; 
  } else { 
      return a * b;
  };
};

function divide(a, b) {
  console.log("Divide was called: ", "Total (First Operand)", a, "Second Opperand: ",  b);
  if (b === 0) {
    return "Inappropriate"; 
} else if (a / b === 0) {
    return b;
  } else {
    return a / b
  };
};

acBtn.addEventListener("click", allClear);
function allClear() {

  // Deletes the display value
  lastButton = "AC";
  displayValue.remove();

  // Appends the dispalyDummy <p> element to act as placeholder
  displayDiv.appendChild(displayDummy);
  displayDummy.textContent = 0;

  // Reset values of all variables
  globalOperator =  undefined;
  previousOperator = undefined;
  secondOperand = null;
  total = null;
};


/* DELETE BUTTON This works but get the operators to chain first
delBtn.addEventListener("click", deleteChar);
function deleteChar() {
let displayString = displayValue.textContent;
let editedDisplayString = displayString.slice(0, -1)
if (editedDisplayString.length === 0) {
  displayValue.textContent = 0;
} else if (total !== null && editedDisplayString.length === 0) {
  operatorActive = true;
  displayValue.textContent = total;
} else if (displayValue.textContent === "Inappropriate") {
  operatorActive = true;
  displayValue.textContent = total;
  
} else {
 
    displayValue.textContent = editedDisplayString;
  };
};  
// */