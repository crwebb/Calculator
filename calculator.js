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
  displayValue.textContent += e.target.textContent;
} else {
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
// If first button that is pressed is an operator it sets display value to 0 
if (displayDummy.textContent === "0") displayValue.textContent = 0;

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

if (a / b === Infinity) return "Inappropriate";
if (operator === undefined) return parseFloat(displayValue.textContent); 

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

  console.log("Equals Pressed:", globalOperator,
  " First Opperand: ", firstOperand, "Second Opperand: ", parseFloat(displayValue.textContent));

total = operate(firstOperand, parseFloat(displayValue.textContent), globalOperator);
  
if (total === "Inappropriate") {
  firstOperand = null;
  previousValue = null;
  total = 0;
  displayValue.textContent = "Inappropriate";
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
