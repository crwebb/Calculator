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

let displayValue = document.getElementById("displayValue");
let displayDummy = document.getElementById("displayDummy");

let eqlsBtn = document.getElementById("eqlsBtn");
let globalOperator;
let operatorActive = false;

let firstOperand = null;
let previousValue = null;
let total = null;


[...numbers].forEach(elem => elem.addEventListener('click', enterNum));
function enterNum(e) {

displayDummy.textContent = "";
  
if (operatorActive === false) {
  // Adds to display value  (Maybe check here if display value contains "." if so, disable decimal button)
  displayValue.textContent += e.target.textContent; 
} else {
  // Wipes display and lets you start a new display value after pressing an operator 
  operatorActive = false;
  displayValue.textContent = "";
  displayValue.textContent += e.target.textContent;
  };
  console.log("Display Value", e.target.textContent);
};



[...operators].forEach(elem => elem.addEventListener('click', enterOperator));
function enterOperator(e) {

if (e.target.textContent === "+") globalOperator = "add";
if (e.target.textContent === "-") globalOperator = "subtract";
if (e.target.textContent === "*") globalOperator = "multiply";
if (e.target.textContent === "/") globalOperator = "divide";

// Start fresh after dividing by 0 and getting snarky response.
if (displayValue.textContent === "Inappropriate") displayValue.textContent = 0;


if (displayDummy.textContent === "0") {
  displayValue.textContent = 0;   // if first button press is operator, sets firstOperand 0
  displayDummy.textContent = "";  // empties display dummy text to not visually stay around
};

// Is used for when entering number to prompt display to change to a new string
operatorActive = true;

firstOperand = parseFloat(displayValue.textContent);

if (previousValue === null) {
  displayValue.textContent = firstOperand;
} else {
  displayValue.textContent = previousValue;
}
console.log("Operator Pressed:", e.target.textContent, globalOperator);
};


function operate(a, b, operator) {

a = firstOperand;
b = parseFloat(displayValue.textContent);

// Stops try to divide by 0, even after pressing equals first.
if (a / b === Infinity || a === 0 && b === 0 && globalOperator === "divide") {
  return "Inappropriate";  
};

// Just keeps display value if equals is pressed and no operator has been assigned
if (operator === undefined) return parseFloat(displayValue.textContent); 

// Operates and returns sum
if (operator === "add") {
  return add(a, b);
  } else if (operator === "subtract") {
  return subtract(a, b); 
  } else if (operator === "multiply") {
  return multiply(a, b);
  } else if (operator === "divide") {
  return divide(a, b);
  };
 };


eqlsBtn.addEventListener("click", equals);
function equals() {

operatorActive = true;

// if equals is pressed before any numbers / operators it sets both operands to 0
if (displayDummy.textContent === "0") {
  firstOperand = 0;
  displayValue.textContent = 0;
  displayDummy.textContent = "";
} 

  console.log("Equals Pressed:", globalOperator,
  " First Opperand: ", firstOperand, "Second Opperand: ", parseFloat(displayValue.textContent));

// Sets total to the returned value of operate function
total = operate(firstOperand, parseFloat(displayValue.textContent), globalOperator);

// if the returned value from operate was inappropriate, set variables to 0. 
if (total === "Inappropriate") {
  firstOperand = 0;
  previousValue = 0;
  total = 0;
  displayValue.textContent = "Inappropriate";
// Else set total to round to 3 decimal places If needed.
} else { 
  total = +total.toFixed(3);
  previousValue = total;
  displayValue.textContent = total;
}
  console.log("Total: ", total)
};


function add(a, b) {
  console.log("Add was called: ", "First Opperand:", a, "Second Opperand: ",  b);
  return a + b;
};

function subtract(a, b) {
  console.log("Subtract was called: ", "First Opperand:", a, "Second Opperand: ",  b);
  return a - b;
};

function multiply(a, b) {
  console.log("Multiply was called: ", "First Opperand:", a, "Second Opperand: ",  b);
  return a * b;
};

function divide(a, b) {
  console.log("Divide was called: ", "First Opperand:", a, "Second Opperand: ",  b);
  return a / b;
};

acBtn.addEventListener("click", allClear);
function allClear() {
  //  globalOperator =  null/undefined ? ;
  firstOperand = null;
  previousValue = null;
  total = null;
  displayValue.textContent = "";
  displayDummy.textContent = "0";
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