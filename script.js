function operate(lastNumber, lastNumber, operator) {

}

let input = '';
let nextNumber = '';
let lastNumber = '';
let operator = '';
let operatorActive;

const display = document.querySelector('.display');
const keys = document.querySelector('.keys');

keys.addEventListener('mousedown', function (e) {
    const target = e.target;

    if (target.tagName != 'BUTTON') {
        return;
    }

    // Click on number keys
    if (target.className.includes('btn-num')) {
        const targetContent = e.target.textContent;
        const displayContent = display.textContent;

        if (target.id === 'negative') {
            // Ignore negative zero
            if (input === '') {
                return;
            }
            const negativeNum = parseInt(input) * -1;
            input = negativeNum + '';
        } else {
            input += targetContent;
        }

        // Limit length to 18 (max display size)
        if (input.length >= 18) {
            alert('Maximum number size reached!');
            return;
        }

        display.textContent = input;
    }

    if (target.className.includes('btn-op')) {
        // Default initial value
        if (input === '') {
            nextNumber = '0';
        }

        if (target.id === '=') {
            operate();
            operatorActive.classList.remove('btn-op-active');
        }

        // Accept only one operator at a time
        if (operator != '') {
            return;
        }
        // Visual style for activated button
        target.classList.add('btn-op-active');
        operatorActive = keys.querySelector('.btn-op-active');

        operator = target.id;

        // First entry
        if (nextNumber === '') {
            nextNumber = input;
            input = '';
            return;
        } else {
            lastNumber = nextNumber;
            nextNumber = input;
            input = '';
            return;
        }

        // display.textContent = lastNumber;
    }
});
