function operate(num1, num2, operator) {
    switch (operator) {
        case 'add':
            return num1 + num2;
        case 'sub':
            return num1 - num2;
        case 'mult':
            return num1 * num2;
        case 'divi':
            return num1 / num2;
    }
}

let currentValue;
let previousValue;
let result;
let operator = '';
let currentInput = '';

const display = document.querySelector('.display');
const numpad = document.querySelector('.numpad');
const operators = document.querySelector('.operators');
const calcFunctions = document.querySelector('.functions');

numpad.addEventListener('click', function (e) {
    if (e.target.tagName != 'BUTTON') {
        return;
    }

    const targetContent = e.target.textContent;
    const displayContent = display.textContent;

    if (targetContent === '+/-') {
        if (displayContent === '0') {
            return;
        }
        const num = parseInt(displayContent) * -1;
        currentInput = num + '';
    } else {
        currentInput += targetContent;
    }

    // Limit length to 18 (max display size)
    if (currentInput.length >= 18) {
        alert('Maximum number size reached!');
        return;
    }

    display.textContent = currentInput;
});

operators.addEventListener('click', function (e) {
    operator = e.target.id;

    // Capture the first number and reset the display value
    currentValue = parseInt(currentInput);
    currentInput = '';
});

calcFunctions.addEventListener('click', function (e) {
    const targetContent = e.target.textContent;

    switch (targetContent) {
        case '=':
            result = operate(previousValue, currentValue, operator);
            display.textContent = result + '';
    }
});
