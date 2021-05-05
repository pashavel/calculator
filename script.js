const defaultValue = "0";
const nan = "NaN";
const infinity = "Infinity"

let currentOperation = "";
let leftSideVariable = "";

let isOperationAddedBefore = false;
let isCalculatedBefore = false;

const leftSideElement = document.getElementById("leftSide");
const outputElement = document.getElementById("output");

function clearOutput() {
    leftSideElement.innerText = "";
    outputElement.innerText = defaultValue;

    currentOperation = "";
    leftSideVariable = "";
}

function addNumber(number) {
    if (isCalculatedBefore === true || isOperationAddedBefore === true) {
        outputElement.innerText = number;
        isCalculatedBefore = false;
        isOperationAddedBefore = false;
        return;
    }

    if (outputElement.innerText === defaultValue) {
        outputElement.innerText = number;
    } else {
        outputElement.innerText += number;
    }
}

function addOperation(operation) {
    isOperationAddedBefore = true;

    //delete dot
    if (outputElement.innerText[outputElement.innerText.length - 1] === '.')
        outputElement.innerText = outputElement.innerText.substr(0, outputElement.innerText.length - 1);

    leftSideVariable = outputElement.innerText;
    leftSideElement.innerText = leftSideVariable + ` ${operation}`;
    currentOperation = operation;
}

function addDot() {
    if (outputElement.innerText === nan || outputElement.innerText === infinity)
        return;

    if (isOperationAddedBefore) {
        outputElement.innerText = defaultValue + '.';
        return
    }

    if (!outputElement.innerText.includes('.'))
        outputElement.innerText += '.';
}

function changeSign() {
    if (outputElement.innerText === defaultValue || outputElement.innerText === nan)
        return;

    if (outputElement.innerText[0] === '-') {
        outputElement.innerText = outputElement.innerText.substr(1);
    } else {
        outputElement.innerText = '-' + outputElement.innerText;
    }
}

function calculate() {
    isCalculatedBefore = true;

    if (leftSideElement.length <= 0 || currentOperation === "")
        return;

    switch (currentOperation) {
        case '÷':
            outputElement.innerText = (leftSideVariable / outputElement.innerText).toString();
            break;
        case 'x':
            outputElement.innerText = (leftSideVariable * outputElement.innerText).toString();
            break;
        case '-':
            outputElement.innerText = (leftSideVariable - outputElement.innerText).toString();
            break;
        case '+':
            outputElement.innerText = (parseFloat(leftSideVariable) + parseFloat(outputElement.innerText)).toString();
            break;
    }

    leftSideVariable = "";
    leftSideElement.innerText = "";
    currentOperation = "";
}

function percentage() {
    if (leftSideVariable.length < 0 || leftSideVariable === defaultValue) {
        clearOutput();
        return;
    }

    outputElement.innerText = (leftSideVariable / 100 * outputElement.innerText).toString();
    calculate();
}