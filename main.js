const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const decimalBtn = document.querySelector(".decimal");
const backspaceBtn = document.querySelector(".backspace");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const displayElem = document.querySelector(".display");
const number0 = document.querySelector("#zero");
const number1 = document.querySelector("#one");
const number2 = document.querySelector("#two");
const number3 = document.querySelector("#three");
const number4 = document.querySelector("#four");
const number5 = document.querySelector("#five");
const number6 = document.querySelector("#six");
const number7 = document.querySelector("#seven");
const number8 = document.querySelector("#eight");
const number9 = document.querySelector("#nine");
const opSum = document.querySelector("#sum");
const opDivide = document.querySelector("#divide");
const opMultiply = document.querySelector("#multiply");
const opSubtract = document.querySelector("#subtract");

const state = {
  operandA: "",
  operandB: "",
  operator: "",
  error: "",
};

const add = (a, b) => Math.floor((a + b) * 100) / 100;
const subtract = (a, b) => Math.floor((a - b) * 100) / 100;
const multiply = (a, b) => Math.floor(a * b * 100) / 100;
const divide = (a, b) => {
  if (b === 0) {
    state.error = "ERROR: divide by 0";
    return null;
  }
  return Math.floor((a / b) * 100) / 100; // round to 2 decimal
};

const convertNumber = (s) => {
  if (s.includes(".")) {
    return Number.parseFloat(s);
  }
  return Number.parseFloat(s, 10);
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
      state.error = "ERROR: unknown operator";
      result = null;
  }
  return result;
}

function display(displayValue) {
  displayElem.textContent = displayValue;
}

function initCal() {
  for (let key in state) {
    state[key] = "";
  }
  decimalBtn.removeAttribute("disabled");
  display("Hello");
}

clearBtn.addEventListener("click", initCal);

numberBtns.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    if (state.error) {
      initCal();
      return;
    }
    if (!state.operandB && !state.operator) {
      state.operandA = state.operandA + event.target.textContent;
      display(state.operandA);
      return;
    }
    if (state.operandA && state.operator) {
      state.operandB = state.operandB + event.target.textContent;
      display(state.operandB);
      return;
    }
  })
);

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    decimalBtn.removeAttribute("disabled");
    if (state.error) {
      initCal();
      return;
    }
    if (!state.operandA && !state.operandB && !state.operator) {
      state.error = "ERROR: invalid input";
      display(state.error);
      return;
    }
    if (state.operandA && !state.operandB && state.operator) {
      state.error = "ERROR: invalid input";
      display(state.error);
      return;
    }
    if (state.operandA && !state.operandB && !state.operator) {
      state.operator = event.target.textContent;
      return;
    }
    if (state.operandA && state.operandB && state.operator) {
      const result = operate(
        convertNumber(state.operandA),
        convertNumber(state.operandB),
        state.operator
      );
      state.operandA = typeof result === "string" ? "" : result.toString();
      state.operator = event.target.textContent;
      state.operandB = "";
      display(result);
    }
  });
});

equalBtn.addEventListener("click", (event) => {
  decimalBtn.setAttribute("disabled", true);
  if (state.error) {
    initCal();
    return;
  }
  if (!state.operandA && !state.operandB && !state.operator) {
    state.error = "ERROR: invalid input";
    display(state.error);
    return;
  }
  if (state.operandA && !state.operandB && state.operator) {
    state.error = "ERROR: invalid input";
    display(state.error);
    return;
  }
  if (state.operandA && state.operandB && state.operator) {
    const result = operate(
      convertNumber(state.operandA),
      convertNumber(state.operandB),
      state.operator
    );
    state.operandA = typeof result === "string" ? "" : result.toString();
    state.operandB = "";
    state.operator = "";
    display(result);
  }
});

decimalBtn.addEventListener("click", (event) => {
  event.target.setAttribute("disabled", true);
  if (state.operator) {
    state.operandB = state.operandB + ".";
    display(state.operandB);
  } else {
    state.operandA = state.operandA + ".";
    display(state.operandA);
  }
});

backspaceBtn.addEventListener("click", (event) => {
  if (state.error) {
    initCal();
    return;
  }
  if (state.operandB) {
    state.operandB = state.operandB.slice(0, -1);
    display(state.operandB);
    if (!state.operandB.includes(".")) decimalBtn.removeAttribute("disabled");
  } else if (state.operandA && !state.operator) {
    state.operandA = state.operandA.slice(0, -1);
    display(state.operandA);
    if (!state.operandA.includes(".")) decimalBtn.removeAttribute("disabled");
  } else {
    return;
  }
  return;
});

document.addEventListener("keydown", (event) => {
  const clickEvent = new Event("click");
  if (event.shiftKey && event.key === "+") {
    opSum.dispatchEvent(clickEvent);
    return;
  }
  switch (event.key) {
    case "0":
      number0.dispatchEvent(clickEvent);
      break;
    case "1":
      number1.dispatchEvent(clickEvent);
      break;
    case "2":
      number2.dispatchEvent(clickEvent);
      break;
    case "3":
      number3.dispatchEvent(clickEvent);
      break;
    case "4":
      number4.dispatchEvent(clickEvent);
      break;
    case "5":
      number5.dispatchEvent(clickEvent);
      break;
    case "6":
      number6.dispatchEvent(clickEvent);
      break;
    case "7":
      number7.dispatchEvent(clickEvent);
      break;
    case "8":
      number8.dispatchEvent(clickEvent);
      break;
    case "9":
      number9.dispatchEvent(clickEvent);
      break;
    case "-":
      opSubtract.dispatchEvent(clickEvent);
      break;
    case "*":
      opMultiply.dispatchEvent(clickEvent);
      break;
    case "/":
      opDivide.dispatchEvent(clickEvent);
      break;
    case "=":
      equalBtn.dispatchEvent(clickEvent);
      break;
    case ".":
      decimalBtn.dispatchEvent(clickEvent);
      break;
    case "Backspace":
      backspaceBtn.dispatchEvent(clickEvent);
      break;
    case "Enter":
      equalBtn.dispatchEvent(clickEvent);
      break;
  }
});
