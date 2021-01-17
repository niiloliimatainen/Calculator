class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") {
            return;
        } else if (this.previousOperand !== "") {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    calculate() {
        let answer;
        const current = parseFloat(this.currentOperand);
        const previous = parseFloat(this.previousOperand);
        if (isNaN(current) || isNaN(previous)) {
            return;
        }

        switch (this.operation) {
            case "+":
                answer = previous + current;
                break;

            case "-":
                answer = previous - current;
                break;

            case "*":
                answer = previous * current;
                break;

            case "÷":
                if (current === 0) {
                    break;
                }
                answer = previous / current;
                break;
            default:
                return;

        }

        this.previousOperand = "";
        this.currentOperand = answer;
        this.operation = undefined;
        console.log(this.previousOperand);
    }


    updateOutput() {
        this.currentTextElement.innerText = this.currentOperand;
        if (this.operation !== undefined) {
            this.previousTextElement.innerText =
                this.previousOperand + " " + this.operation;
        } else {
            this.previousTextElement.innerText = this.previousOperand;
        }

    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");


const calc = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calc.appendNumber(button.innerText);
        calc.updateOutput();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calc.chooseOperation(button.innerText);
        calc.updateOutput();
    })
})

clearButton.addEventListener("click", () => {
    calc.clear();
    calc.updateOutput();
})

deleteButton.addEventListener("click", () => {
    calc.delete();
    calc.updateOutput();
})

equalsButton.addEventListener("click", () => {
    calc.calculate();
    calc.updateOutput();
})

















































