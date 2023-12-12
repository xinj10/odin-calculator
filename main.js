const displayElem = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

let operandA = "";
let operandB = "";
let operator = "";

const state = {
  a: false, //operand A
  b: false, // operand B
  o: false, //operator
  e: false, // if it's in error state
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    state.e = true;
    return "ERROR: divide by 0";
  }
  return Math.floor((a / b) * 100) / 100; // round to 2 decimal
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

function initCal() {
  state.a = false;
  state.b = false;
  state.o = false;
  state.e = false;
  operandA = "";
  operandB = "";
  operator = "";
  display("Hello");
}

clearBtn.addEventListener("click", initCal);

numberBtns.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    if (state.e) {
      initCal();
      return;
    }
    if (!state.a && !state.b && !state.o) {
      state.a = true;
      operandA = operandA + event.target.textContent;
      display(operandA);
      return;
    }
    if (state.a && !state.b && !state.o) {
      operandA = operandA + event.target.textContent;
      display(operandA);
      return;
    }
    if (state.a && !state.b && state.o) {
      operandB = operandB + event.target.textContent;
      state.b = true;
      display(operandB);
      return;
    }
    if (state.a && state.b && state.o) {
      operandB = operandB + event.target.textContent;
      display(operandB);
      return;
    }
  })
);

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (state.e) {
      initCal();
      return;
    }
    if (!state.a && !state.b && !state.o) {
      display("ERROR: invalid input");
      state.e = true;
      return;
    }
    if (state.a && !state.b && !state.o) {
      state.o = true;
      operator = event.target.textContent;
      return;
    }
    if (state.a && !state.b && state.o) {
      display("ERROR: invalid input");
      state.e = true;
      return;
    }
    if (state.a && state.b && state.o) {
      const result = operate(
        Number.parseInt(operandA, 10),
        Number.parseInt(operandB, 10),
        operator
      );
      operandA = typeof result === "string" ? "" : result.toString();
      state.a = true;
      opertor = event.target.textContent;
      state.o = true;
      operandB = "";
      state.b = false;
      display(result);
    }
  });
});

equalBtn.addEventListener("click", (event) => {
  if (state.e) {
    initCal();
    return;
  }
  if (!state.a && !state.b && !state.o) {
    display("ERROR: invalid input");
    state.e = true;
    return;
  }
  if (state.a && !state.b && !state.o) {
    return;
  }
  if (state.a && !state.b && state.o) {
    display("ERROR: invalid input");
    state.e = true;
    return;
  }
  if (state.a && state.b && state.o) {
    const result = operate(
      Number.parseInt(operandA, 10),
      Number.parseInt(operandB, 10),
      operator
    );
    operandA = typeof result === "string" ? "" : result.toString();
    state.a = true;
    operandB = "";
    state.b = false;
    operator = "";
    state.o = false;
    display(result);
  }
});
