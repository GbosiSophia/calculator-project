const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    handleInput(value);
  });
});

function isOperator(char) {
    return ["+", "-", "x", "/", "^"].includes(char)
}

function handleInput(value) {
  if (value === "C") {
    expression = "";
    display.value = "";
    return;
  }

  if (value === "=") {
    try {
      const safeExpression = expression
            .replaceAll("x", "*")
            .replaceAll("^","**");
      const result = eval(safeExpression);

      display.value = result;
      expression = String(result);
    } catch (error) {
      display.value = "Error";
      expression = "";
    }
    return;
  }
    //Prevent multiple decimals in one number
    if (value === ".") {

        //Split expression by operators
        const parts = expression.split(/[+\-x\/]/);

        //get last part of current number
        const currentNumber = parts[parts.length - 1];

        //if current number already has a decimal point -> stop
        if (currentNumber.includes(".")) {
            return;
        }
        //if decimal is first character, add leading zero
        if (currentNumber === "") {
            expression += "0";
        }
    }

  //if it's an operator
  if (isOperator(value)) {
    //if expression is empty-> don't allow starting with an operator
    if (expression === "") {
        return;
    }
    //Get last character typed
    const lastChar = expression[expression.length - 1];

    //if last character is also an operator -> stop
    if(isOperator(lastChar)) {
        return;     
    }
  }
  expression += value;
  display.value = expression;
}