(function() {
    var calculator = document.getElementById("calculator"),
        screens = document.querySelectorAll(".screens input"),
        inputScreen = document.getElementById("screenInput"),
        topScreen = document.getElementById("screen1"),
        displayBtns = document.getElementsByClassName("display-btns"),
        clearBtn = document.getElementById("clear"),
        deleteBtn = document.getElementById("delete"),
        equalBtn = document.getElementById("equal"),
        operators = "+-*/";

    function fixDot(element) {
        var eleValue = element.value,
            lastInput = eleValue.substr(-1);
        if (operators.indexOf(lastInput) !== -1 || lastInput === "(" ||
            eleValue === "") { // if previous input is op, or (, or empty
            element.value += "0";
        } else if (lastInput === ".") { // if consecutive dots appear
            element.value = eleValue.substr(0, eleValue.length - 1);
        }
        return eleValue;
    }

    function fixNums(value) {
        return value.replace(/[\d.]+/g, function(n) {
            return parseFloat(n);
        });
    }

    function displayValue(btn) {
        var lastInput = inputScreen.value.substr(-1);

        if (btn.value === ".") {
            fixDot(inputScreen); // call fixDot
        } else if (operators.indexOf(btn.value) !== -1) {// if btn.value is an op
            if (operators.indexOf(lastInput) !== -1) {
                inputScreen.value = inputScreen.value.substr(0, inputScreen.value.length - 1);
            }
        }
        inputScreen.value += btn.value;
    }


    for (var i = 0; i < displayBtns.length; i++) {
        displayBtns[i].addEventListener("click", function() {
            displayValue(this);
        });
    }

    // clearBtn: click once to clean inputScreen
    clearBtn.addEventListener("click", function() {
        inputScreen.value = "";
    });

    // clearBtn: double click to clean topScreen
    clearBtn.addEventListener("dblclick", function() {
        topScreen.value = "";
    });

    deleteBtn.addEventListener("click", function() {
        inputScreen.value = inputScreen.value.substring(0,
            inputScreen.value.length - 1);
    });

    equalBtn.addEventListener("click", function() {
        var fixedValue = fixNums(inputScreen.value);

        topScreen.value = inputScreen.value;

        try {
            inputScreen.value = eval(fixedValue);
        } catch(e) {
            inputScreen.value = "Error";
        }

    });

})();