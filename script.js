// Function to display values
function dis(val) {
    let display = document.getElementById("display");
    let currentValue = display.value;

    if (
        (val === '(' && currentValue.match(/\d$/)) || 
        (val.match(/^\d+$/) && currentValue.match(/\)$/)) 
    ) {
        display.value += '*' + val; // Insert '*' before the next value
    } else {
        display.value += val;
    }
}

// Handle keypresses for digits and operators
function myFunction(event) {
    if (event.key == '0' || event.key == '1' ||
        event.key == '2' || event.key == '3' ||
        event.key == '4' || event.key == '5' ||
        event.key == '6' || event.key == '7' ||
        event.key == '8' || event.key == '9' ||
        event.key == '+' || event.key == '-' ||
        event.key == '*' || event.key == '/') {
        document.getElementById("display").value += event.key;
    }
}

// Enter key functionality to solve expression
var cal = document.getElementById("calcu");
cal.onkeyup = function (event) {
    if (event.keyCode === 13) {
        solve();
    }
};

// Function that evaluates the expression
function solve() {
    let displayValue = document.getElementById("display").value;

    // Handling percentage calculation
    if (displayValue.includes('%')) {
        let expression = displayValue.split('%');
        let result = eval(expression[0]) / 100;
        document.getElementById("display").value = result;
    } 
    // Handling square root calculation
    else if (displayValue.includes('√')) {
        let sqrtRegex = /(\d+)?√(\d+)/;
        let match = displayValue.match(sqrtRegex);

        if (match) {
            let multiplier = match[1] ? eval(match[1]) : 1;  // If there's a number before '√', use it; otherwise, default to 1
            let sqrtValue = Math.sqrt(eval(match[2]));  // Calculate square root of the number after '√'
            let result = multiplier * sqrtValue;
            document.getElementById("display").value = result;
        } else {
            alert('Invalid square root expression');
        }
    } 
    // General case for evaluation
    else {
        try {
            let implicitMultiplicationRegex = /\)(\d)|(\d)\(/g;
            displayValue = displayValue.replace(implicitMultiplicationRegex, function (match, group1, group2) {
                return group1 ? `)*${group1}` : `${group2}*(`;
            });

            let result = eval(displayValue);
            document.getElementById("display").value = result;
        } catch (error) {
            alert('Invalid expression');
            clr();
        }
    }
}

// Function to clear display
function clr() {
    document.getElementById("display").value = "";
}
