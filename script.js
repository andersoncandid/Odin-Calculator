function operate(lastNumber, nextNumber, operator) {
    const num1 = parseFloat(lastNumber);
    const num2 = parseFloat(nextNumber);
    let solution = 0;

    switch (operator) {
        case 'add':
            solution = num1 + num2;
            break;
        case 'sub':
            solution = num1 - num2;
            break;
        case 'mult':
            solution = num1 * num2;
            break;
        case 'div':
            if (num2 === 0) {
                return 'Error: divide by zero';
            }
            solution = num1 / num2;
            break;
    }
    return Math.round(solution * 100) / 100;
}

let input = '';
let nextNum = '';
let lastNum = '';
let operator = '';
let result;
let enterEqual = false;

const display = document.querySelector('.display');

function calculator(e) {
    const target = e.target;

    // Ignore clicks outside of buttons
    if (target.tagName != 'BUTTON') {
        return;
    }

    // Reset operation after '=' followed by new entry
    if (
        enterEqual &&
        target.id != 'equal' &&
        !target.className.includes('btn-cl')
    ) {
        lastNum = nextNum;
        nextNum = '';
        operator = '';
    }

    // Enter numbers keys
    if (target.className.includes('btn-num')) {
        const targetContent = e.target.textContent;

        // Prevent more than one decimal separator
        if (target.id === 'dot' && (input.includes('.') || input === '')) {
            return;
        }

        if (target.id === 'negative') {
            // Ignore negative zero
            if (input === '') {
                input = display.textContent;
            }
            const negativeNum = parseFloat(input) * -1;
            input = String(negativeNum);
        } else {
            input += targetContent;
        }

        // Limit length to 18 (max display size)
        if (input.length >= 18 && display.textContent.length >= 18) {
            alert('Maximum number size reached!');
            return;
        }

        display.textContent = input;
    }

    // Enter operators keys
    if (target.className.includes('btn-op')) {
        if (input === '' && nextNum === '' && lastNum === '') {
            return;
        }

        // Store input in variables
        if (input != '') {
            if (nextNum != '') {
                lastNum = nextNum;
            }
            nextNum = input;
        }

        // Validates the values, if all exist
        if (lastNum != '' && nextNum != '' && operator != '') {
            result = operate(lastNum, nextNum, operator);
            lastNum = nextNum;
            nextNum = String(result);
            display.textContent = result;
        }

        // Store entry operator
        if (target.id != 'equal') {
            operator = target.id;
            enterEqual = false;
        } else if (lastNum != '') {
            enterEqual = true;
        }
        input = '';
    }

    if (target.className.includes('btn-cl')) {
        if (target.id === 'all_clear') {
            nextNum = '';
            lastNum = '';
            operator = '';
            result = '';
        }
        input = '';
        display.textContent = '';
    }
}

const keys = document.querySelector('.keys');

keys.addEventListener('mousedown', calculator);
