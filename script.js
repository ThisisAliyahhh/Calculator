const display = document.querySelector(".display-screen__input");
const result = document.querySelector(".display-screen__result");
const button = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operation");
const mode = document.querySelector(".mode");
const headerTime = document.querySelector(".phone__status__time");
const statusIcon = document.querySelectorAll(".status-icon");
const layout = document.querySelector(".phone__layout");
const toggle = document.querySelector(".menu__toggle");
const toggleLogo = document.querySelector(".toggle-logo");
const keypad = document.querySelector(".keypad");
const bar = document.querySelector(".bottom-bar");


const updateTime = () => {
  const phoneTime = document.querySelector(".phone__status__time");
  const time = new Date();
  let hour = time.getHours();
  hour = hour >=12 ? hour % 12 : hour;
  const minute = time.getMinutes().toString().padStart(2, 0);
  const fullTime =  `${hour}:${minute}`;
  phoneTime.textContent = fullTime;
}

updateTime();
setInterval(updateTime, 1000);



button.forEach(elements => {
    elements.addEventListener("click", event => {


        const evaluate = (equation) => {
            const operator = Array.from(operators).map(symbols => symbols.textContent);
            const otherOperators = operator.slice(0,3);
            const arithmeticOperators = operator.slice(3).join("");

            const values = [];
            const symbols = [];
            let num = "";

            let total = equation;
            for (let i = 0; i <  equation.length; i++){
                if (arithmeticOperators.includes(equation[i])){
                    symbols.push(equation[i]);
                    values.push(Number(num));
                    num = "";
                }
                else{
                    num += equation[i];
                }
            }
            values.push(Number(num));

            console.log(otherOperators);

            for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex ++){
                if (symbols[symbolIndex] === arithmeticOperators[0]){
                    values[symbolIndex] = values[symbolIndex] / values[symbolIndex + 1];
                    total = values[symbolIndex];
                    values.splice(symbolIndex + 1, 1);
                    symbols.splice(symbolIndex,1);
                }
                if (symbols[symbolIndex] === arithmeticOperators[1]){
                    values[symbolIndex] = values[symbolIndex] * values[symbolIndex + 1];
                    total = values[symbolIndex];
                    values.splice(symbolIndex + 1, 1);
                    symbols.splice(symbolIndex,1);
                }
            }

            let result = values[0];
            for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex ++){
                if (symbols[symbolIndex] === arithmeticOperators[3]){
                    result += values[symbolIndex + 1];
                    total = result;
                }
                if (symbols[symbolIndex] === arithmeticOperators[2]){
                    result -= values[symbolIndex + 1];
                    total = result;
                }
            }
            

            return total;
        }

        const addOperator = (op) => {
                if (display.style.fontSize === "2rem"){
                    display.style.fontSize = "4rem";
                    result.style.fontSize = "2rem";
                    display.value = result.textContent;
                    display.value += op;
                }
                else{
                    if (display.value === ""){
                        if (op !== "−"){
                            display.value += 0;
                        }
                    }
                    display.value += op;
                }
        } 

        const resetDisplay = (reset, value="") =>{
            if (display.style.fontSize === "2rem" && result.style.fontSize === "4rem"){
                display.value = reset;
                result.textContent = reset;
                if (reset === "0"){
                    display.value = "";
                    result.textContent = "0";
                }
                display.style.fontSize = "4rem";
                result.style.fontSize = "2rem";
            }
            else{
                display.value += value;
            }
        }

        switch(event.target.textContent){
            case "AC":
                resetDisplay(0);
                display.value = "";
                result.textContent = 0;
                break;
            case "%":
                display.value = display.value === "" ? "" : result.textContent/100;
                break;
            case "÷":
                addOperator("÷");
                break;
            case "×":
                addOperator("×");
                break;
            case "+":
                addOperator("+");
                break;
            case "−":
                addOperator("−");
                break;
            case "=":
                if (display.value === ""){
                    result.textContent = "0"
                }
                else{
                    result.textContent = evaluate(display.value);
                    display.style.fontSize = "2rem";
                    result.style.fontSize = "4rem";
                }
                break;
            case ".":
                if (display.value === ""){
                    display.value += "0"
                }
                else{
                    resetDisplay("0", "");
                }
                display.value += event.target.textContent;
                break;
            case "0":
                if (display.value === ""){
                    display.value = "";
                    result.textContent = "0";
                }
                else{
                    resetDisplay(event.target.textContent, event.target.textContent);
                }
                break;
            case "+/-":
                if (display.value === ""){
                    display.value = "";
                }
                else{
                    const negpos = result.textContent *= -1;
                    display.value = negpos;
                }
                break;

            default:
                result.textContent = resetDisplay(event.target.textContent, event.target.textContent);
        }

        

        if (event.currentTarget.querySelector("img")){
            display.value = display.value.trim();
            if (display.value.length > 1){
                display.value = display.value.slice(0, -1);
                result.textContent = display.value;
            }
            else{
                result.textContent= "0";
                display.value = "";
            }
        }
    }
)
    
}
)


mode.addEventListener("click", () => {
    if (mode.getAttribute("src") === "./image/dark.svg"){
        mode.src = "./image/day.svg";
        headerTime.style.color= "#FFFFFF";
        layout.style.background = "#2A2D37";
        toggle.style.color = "#FFFFFF";
        toggleLogo.src = "./image/down-arrow-w.svg";
        keypad.style.background = "#2A2D37";
        display.style.color = "#FFFFFF";
        result.style.color = "#FFFFFF";
        bar.style.background = "#FFFFFF";
        bar.style.borderColor = "#FFFFFF"
        statusIcon.forEach(element => {
            switch(element.getAttribute("src")){
                case "./image/signal.svg":
                    element.src = "./image/signal-w.svg";
                    break;
                case "./image/wi-fi.svg":
                    element.src = "./image/wi-fi-w.svg";
                    break;
                case "./image/battery.svg":
                    element.src = "./image/battery-w.svg";
                    break;
                default:
                    console.log("wrong url")
            }
        })
        button.forEach(element => {
            const buttonStyle = getComputedStyle(element);
            if (buttonStyle.backgroundColor === "rgb(255, 255, 255)"){
                element.style.background = "#2E313B";
                if (buttonStyle.color === "rgb(51, 51, 51)"){
                    element.style.color = "#FFFFFF";
                }
            }
        })

    }
    else{
        mode.src = "./image/dark.svg";
        headerTime.style.color= "#333333";
        layout.style.background = "#FFFFFF";
        toggle.style.color = "#333333";
        toggleLogo.src = "./image/down-arrow.svg";
        keypad.style.background = "#F2F3F7";
        display.style.color = "#333333";
        result.style.color = "#333333";
        bar.style.background = "#000000";
        bar.style.borderColor = "#000000"
        statusIcon.forEach(element => {
            switch(element.getAttribute("src")){
                case "./image/signal-w.svg":
                    element.src = "./image/signal.svg";
                    break;
                case "./image/wi-fi-w.svg":
                    element.src = "./image/wi-fi.svg";
                    break;
                case "./image/battery-w.svg":
                    element.src = "./image/battery.svg";
                    break;
                default:
                    console.log("wrong url")
            }
        })
        button.forEach(element => {
            const buttonStyle = getComputedStyle(element);
            if (buttonStyle.backgroundColor === "rgb(46, 49, 59)"){
                element.style.background = "#FFFFFF";
                if (buttonStyle.color === "rgb(255, 255, 255)"){
                    element.style.color = "#333333";
                }
            }
        })
    }
}
)