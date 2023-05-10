const previousOperationTex = document.querySelector("#previos-operation")
const currentOperationText = document.querySelector("#current-operation")
const button = document.querySelectorAll("#buttons-container button")


class calculator {
    constructor(previousOperationTex, currentOperationText) {
        this.previousOperationTex = previousOperationTex;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }
    addDigit(digit) {
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen()
    }

    processOperation(operation) {
        if (this, currentOperationText.innerText === ""&& operation!=="C") {
            if (this.previousOperationTex.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        const previous = + this.previousOperationTex.innerText.split(" ")[0];
        const current = + this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "C":
                this.processClearCurrentOperation();
            case "CE":
                this.processClearOperation();
            case "=":
                this.processIgualOperation();        
            default:
                return

        }
    }

    updateScreen
        (operationValue = null,
            operation = null,
            current = null,
            previous = null) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if (previous === 0) {
                operationValue = current
            }
            this.previousOperationTex.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }


    }
    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"]
        if (!mathOperation.includes(operation)) {
            return
        }
        
        this.previousOperationTex.innerText = this.previousOperationTex.innerText.slice(0, -1) + operation
    }
    processDelOperation(){
        this.currentOperationText.innerText=
        this.currentOperationText.innerText.slice(0, -1);
    }
    processClearCurrentOperation(){
        this.currentOperationText.innerText="";
    }
    processClearOperation(){
        this.currentOperationText.innerText="";
        this.previousOperationTex.innerText="";
    }
    processIgualOperation(){
      const operation = previousOperationTex.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}
const calc = new calculator(previousOperationTex, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }


    })
})