const displayElem = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return "ERROR: divide by 0";
  return Math.floor((a / b) * 100) / 100; // round to 2 decimal
};

let operandA;
let operandB;
let operator;

const state = {
  a: false, //operand A
  b: false, // operand B
  o: false, //operator
  e: false,
};

function operate(a, b, op) {
  let result;
  switch (op) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      result = "ERROR: unknown operator";
  }
  return result;
}

function display(displayValue) {
  displayElem.textContent = displayValue;
}

numberBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    display();
  })
);
operatorBtns.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    operandA = Number.parseInt(displayValue, 10);
    operator = event.target.textContent;
    displayValue = "";
    displayElem.textContent = operator;
  })
);
equalBtn.addEventListener("click", (event) => {
  operandB = Number.parseInt(displayValue, 10);
  const result = operate(operandA, operandB, operator);
  operandA = 0;
  operandB = 0;
  displayElem.textContent = result;
});
