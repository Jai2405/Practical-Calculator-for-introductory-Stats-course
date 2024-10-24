
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    var product = 1;
    while (n != 1) {
        product *= n;
        n--;
    }
    return product;
}

function combination(n, r) {
    return factorial(n) / (factorial(n - r) * factorial(r));
}

function permutation(n, r) {
    return factorial(n) / factorial(n - r);
}

// Calculate function
function calculate() {
    let input = document.getElementById('calcInput').value;
    
    // Replace 'pi' and 'e' with Math.PI and Math.E
    input = input.replace(/pi/gi, Math.PI);
    input = input.replace(/e/gi, Math.E);

    // Regex for combinations (nCr) and permutations (nPr) and factorial (n!)
    const combinationRegex = /(\d+)[cC](\d+)/g;
    const permutationRegex = /(\d+)[pP](\d+)/g;
    const factorialRegex = /(\d+)!/g;

    // Replace all factorials with their results
    input = input.replace(factorialRegex, function (match, n) {
        n = parseInt(n, 10);
        if (n >= 0) {
            return factorial(n);
        } else {
            return "InvalidExpression"; // Handle invalid factorials
        }
    });

    // Replace all combinations with their results
    input = input.replace(combinationRegex, function (match, n, r) {
        n = parseInt(n, 10);
        r = parseInt(r, 10);
        if (n >= r && n >= 0 && r >= 0) {
            return combination(n, r);
        } else {
            return "InvalidExpression"; // Handle invalid combinations
        }
    });

    // Replace all permutations with their results
    input = input.replace(permutationRegex, function (match, n, r) {
        n = parseInt(n, 10);
        r = parseInt(r, 10);
        if (n >= r && n >= 0 && r >= 0) {
            return permutation(n, r);
        } else {
            return "InvalidExpression"; // Handle invalid permutations
        }
    });

    // Check for invalid expressions
    if (input.includes("InvalidExpression")) {
        $(".abox").addClass("invalid");  // Change font size to 10px for invalid expressions
        $(".abox").text("Invalid Expression. Please review the documentation.");
        return;
    }

    try {
        // Use eval to evaluate the modified expression
        const result = eval(input);
        $(".abox").removeClass("invalid");  // Reset font size to default for valid expressions
        $(".abox").text(result);
    } catch (error) {
        $(".abox").addClass("invalid");  // Change font size to 10px for invalid expressions
        $(".abox").text("Invalid Expression. Please review the documentation.");
    }
}

// Bind the enter key to calculate the expression
$('body').keypress(function (event) {
    var key = event.which;
    if (key == 13) { // Enter key
        event.preventDefault();
        calculate();
    }
});
