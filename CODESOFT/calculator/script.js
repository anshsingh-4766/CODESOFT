// Select the calculator screen (where numbers and results are displayed)
const calculatorScreen = document.querySelector('.calculator-screen');

// Function to update the screen with a given value
function updateScreen(value) {
    calculatorScreen.value = value;
}

// Variables to store current calculation state
let prevInput = '';       // stores the first number
let currentInput = '0';   // stores the current number being typed
let operator = null;      // stores the operator (+, -, *, /)

// Select all buttons
const keys = document.querySelector('.calculator-keys');

// Add event listener to all buttons inside calculator-keys
keys.addEventListener('click', event => {
    const target = event.target;
    const value = target.value;

    // Ignore clicks if it's not a button
    if (!target.matches('button')) return;

    // Handle operator buttons (+, -, *, /)
    if (target.classList.contains('operator') && value !== '=') {
        handleOperator(value);
        return;
    }

    // Handle decimal button
    if (target.classList.contains('decimal')) {
        inputDecimal(value);
        updateScreen(currentInput);
        return;
    }

    // Handle AC (All Clear)
    if (target.classList.contains('all-clear')) {
        clearAll();
        updateScreen(currentInput);
        return;
    }

    // Handle CE (Clear Entry - removes last digit)
    if (target.classList.contains('clear')) {
        clearEntry();
        updateScreen(currentInput);
        return;
    }

    // Handle equal sign (=)
    if (target.classList.contains('equal-sign')) {
        calculate();
        updateScreen(currentInput);
        return;
    }

    // Handle number buttons (0–9)
    inputNumber(value);
    updateScreen(currentInput);
});

// Function to handle number input
function inputNumber(number) {
    if (currentInput === '0') {
        currentInput = number; // replace 0 with new number
    } else {
        currentInput += number; // append number
    }
}

// Function to handle operator input
function handleOperator(nextOperator) {
    if (operator && prevInput !== '') {
        calculate(); // perform calculation if operator already exists
    }
    prevInput = currentInput;
    operator = nextOperator;
    currentInput = '0'; // reset current input for next number
}

// Function to handle decimal input
function inputDecimal(dot) {
    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
}

// Function to clear everything (AC)
function clearAll() {
    prevInput = '';
    currentInput = '0';
    operator = null;
}

// Function to clear last entry (CE)
function clearEntry() {
    currentInput = currentInput.slice(0, -1) || '0';
}

// Function to perform calculation
function calculate() {
    let result = 0;
    const prev = parseFloat(prevInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return; // prevent errors if inputs are empty

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString(); // show result
    operator = null;                  // reset operator
    prevInput = '';                   // clear previous input
}
