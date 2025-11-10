const display = document.querySelector(".display-screen__input");
const result = document.querySelector(".display-screen__result");
const button = document.querySelectorAll(".button");
// const del = document.querySelector("img");


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


// value = Number(display.value);
// console.log(typeof(value));
button.forEach(elements => {
    // console.log(elements.innerHTML);
    elements.addEventListener("click", event => {
        // console.log(event.target);
        const addOperator = (op) => {
                if (display.style.fontSize === "1.5rem"){
                    display.style.fontSize = "2rem";
                    result.style.fontSize = "2rem";
                    display.value = result.textContent;
                    display.value += op;
                }
                else{
                    display.value += op;
                }
        } 

        const resetDisplay = (reset, value) =>{
            if (display.style.fontSize === "1.5rem" && result.style.fontSize === "2.5rem"){
                display.value = reset;
                result.textContent = reset;
                if (reset === "0"){
                    display.value = "";
                    result.textContent = "0";
                }
                else if (reset === "+/-"){
                    display.value *= "-1";
                }
                display.style.fontSize = "2rem";
                result.style.fontSize = "2rem";
            }
            else{
                        display.value += value;
            }
        }

        switch(event.target.textContent){
            case "AC":
                display.value = "";
                break;
            case "%":
                display.value = display.value === "" ? "" : result.textContent/100;
                break;
            case "÷":
                addOperator(" / ");
                break;
            case "×":
                addOperator(" * ");
                break;
            case "+":
                addOperator(" + ");
                break;
            case "-":
                addOperator(" - ");
                break;
            case "=":
                display.style.fontSize = "1.5rem";
                result.style.fontSize = "2.5rem";
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
                resetDisplay("=/-", display.value *= "-1")
                // display.value *= "-1";
                break;

            default:
                // display.value += event.target.textContent;
                resetDisplay(event.target.textContent, event.target.textContent);
        }


        if (display.value === ""){
            result.textContent = "0"
        }
        else{
            result.textContent = eval(display.value)
        }

        console.log(display.value.length);
        if (event.currentTarget.querySelector("img")){
            display.value = display.value.trim();
            if (display.value.length > 1){
                display.value = display.value.slice(0, -1);
                result.textContent = display.value;
                console.log("ooo");
            }
            else{
                result.textContent= "0";
                display.value = "";
                console.log("reee");
            }
        }
    }
)
    
}
)
