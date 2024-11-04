import { backend } from 'declarations/backend';

const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const loading = document.getElementById('loading');

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

async function handleButtonClick(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        currentInput += value;
        updateDisplay();
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            if (firstOperand === '') {
                firstOperand = currentInput;
                currentInput = '';
            } else {
                await calculate();
            }
            operator = value;
        }
    } else if (value === '=') {
        if (currentInput !== '' && firstOperand !== '') {
            await calculate();
        }
    } else if (value === 'C') {
        clear();
    }
}

function updateDisplay() {
    result.value = currentInput;
}

async function calculate() {
    if (firstOperand === '' || currentInput === '' || operator === '') return;

    loading.style.display = 'block';

    try {
        const a = parseFloat(firstOperand);
        const b = parseFloat(currentInput);
        let res;

        switch (operator) {
            case '+':
                res = await backend.add(a, b);
                break;
            case '-':
                res = await backend.subtract(a, b);
                break;
            case '*':
                res = await backend.multiply(a, b);
                break;
            case '/':
                res = await backend.divide(a, b);
                break;
        }

        currentInput = res.toString();
        firstOperand = '';
        operator = '';
        updateDisplay();
    } catch (error) {
        console.error('Calculation error:', error);
        currentInput = 'Error';
        updateDisplay();
    } finally {
        loading.style.display = 'none';
    }
}

function clear() {
    currentInput = '';
    firstOperand = '';
    operator = '';
    updateDisplay();
}
