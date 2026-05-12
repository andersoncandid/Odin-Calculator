function operate(previousValue, currentValue, operator) {
    let result = 0;
    const num1 = parseInt(previousValue);
    const num2 = parseInt(currentValue);

    switch (operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'sub':
            result = num1 - num2;
            break;
        case 'mult':
            result = num1 * num2;
            break;
        case 'divi':
            result = num1 / num2;
            break;
    }

    previousValue = result + '';
    display.textContent = result + '';
    currentValue = '';
}

let numInput = '';
let previousValue = '0';
let currentValue = '0';
let operator = '';
let previousOperator = '';

const display = document.querySelector('.display');
const keys = document.querySelector('.keys');

keys.addEventListener('click', function (e) {
    const target = e.target;

    if (target.tagName != 'BUTTON') {
        return;
    }

    // Click on number keys
    if (target.id === 'num') {
        const targetContent = e.target.textContent;
        const displayContent = display.textContent;

        if (targetContent === '+/-') {
            // Ignore negative zero
            if (displayContent === '0') {
                return;
            }
            const num = parseInt(displayContent) * -1;
            numInput = num + '';
        } else {
            numInput += targetContent;
        }

        // Limit length to 18 (max display size)
        if (numInput.length >= 18) {
            alert('Maximum number size reached!');
            return;
        }

        display.textContent = numInput;
    }

    if (target.parentElement.className === 'operators') {
        // Operator input without any input value
        if (numInput === '' && currentValue === '' && previousValue === '') {
            return;
        }

        if (e.target.id != 'equal') {
            operator = e.target.id;

            // Normal input
            if (numInput != '') {
                currentValue = numInput;
                previousOperator = operator;
                numInput = '';
                return;
            }

            // Perform the calculation
            if (numInput != '') {
                previousValue = currentValue;
                currentValue = numInput;
                operate(previousValue, currentValue, previousOperator);
                previousOperator = operator;
                numInput = '';
                return;
            }
        } else {
            if (previousOperator === '') {
                return;
            }
            // Equal entry continuously
            if (numInput === '') {
                operate(previousValue, previousValue, previousOperator);
                return;
            }
            operate(previousValue, currentValue, previousOperator);
            numInput = '';
        }
    }

    // Click on 'clear' keys
    if (target.id === 'all_clear') {
    }
});
