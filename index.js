class Calculadora {
    constructor() {
        this._operand1 = 0;
        this._operand2 = 0;
        this._operation = "";
    }

    setOperand1(_newOperand1) {
        if (this._operand1 === 0) {
            this._operand1 = _newOperand1;
        } else {
            this._operand1 = this._operand1*10 + _newOperand1;
        }
        
    }

    setOperand2(_newOperand2) {
        if (this._operand2 === 0) {
            this._operand2 = _newOperand2;
        } else {
            this._operand2 = this._operand2*10 + _newOperand2;
        } 
    }

    setOperation(_newOperation) {
        let allowedOPerations = ["+", "-", "/", "*"];
        if( allowedOPerations.includes(_newOperation) ) {
            this._operation = _newOperation;
            return true;
        }
    }

    getResult() {
        let result 
        if (this._operation === "+") {
            result = this._operand1 + this._operand2;
        } else if (this._operation === "-") {
            result = this._operand1 - this._operand2;
        } else if (this._operation === "*") {
            result = this._operand1 * this._operand2;
        } else {
            result = this._operand1 / this._operand2;
        }

        return result;

    }

    clearCalculator() {
        this._operand1 = 0;
        this._operand2 = 0;
        this._operation = "";
    }
}

const calculadora1 = new Calculadora;
const display = document.getElementById('display');
const numberButtons = Array.from(document.getElementsByClassName("number"));
const operationButtons = Array.from(document.getElementsByClassName("operation"));
const equal = document.getElementById("equal");
let state = "first operand";

function changeState() {
    if (state === "first operand") {
        state = "second operand";
    } else {
        state = "first operand";
    }
    
    return state;
}

function changeOperand(number) {
    if (state === "first operand") {
        calculadora1.setOperand1(number);
    } else {
        calculadora1.setOperand2(number);
    }
    return true;
}

function updateDisplay() {
    if (state === "first operand") {
        display.innerHTML = calculadora1._operand1;
    } else {
        display.innerHTML = calculadora1._operand2;
    }
}

numberButtons.map( numberButton => {
    numberButton.addEventListener("click", (event) => {
        let value = Number(event.target.innerText);
        changeOperand(value);
        updateDisplay();
    })
})

operationButtons.map( operationButton => {
    operationButton.addEventListener("click", (event) => {
        let operation = event.target.innerText;
        calculadora1.setOperation(operation);
        display.innerHTML = operation;
        changeState();
    })
})

equal.addEventListener("click", () => {
    display.innerText = calculadora1.getResult();
    calculadora1.clearCalculator();
    changeState();
})
