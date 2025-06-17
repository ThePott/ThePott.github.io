const main = document.querySelector("#main")
const previousSection = document.querySelector("#previous-section")
const currentSection = document.querySelector("#current-section")

const buttonContentArray = [
    "C", "()", "%", "back",
    7, 8, 9, "÷",
    4, 5, 6, "*",
    1, 2, 3, "-",
    0, ".", "=", "+"
]

// const handlerForArithmetic = (currentSection, buttonText) => {
//     const lastCharInNumber = Number(currentSection.innerText.at(-1))
//     // console.log("last char:", innerText.at(-1), "in number:", lastCharInNumber, lastCharInNumber >= 0)
//     if (lastCharInNumber >= 0) {
//         currentSection.innerText += buttonText
//     } else {
//         const trimmedInnerText = currentSection.innerText.slice(0, -1)
//         currentSection.innerText = `${trimmedInnerText}${buttonText}`
//     }
// }

const addEventListenerToButton = (buttonText, button) => {
    let eventListener;
    // console.log("----button:", button, "inner text as argument:", buttonText)

    switch (buttonText) {
        case "C":
            eventListener = () => {
                currentSection.innerText = ""
                previousSection.innerText = ""
            }
            break
        case "()":
            eventListener = () => {
                // 규칙이 뭐냐
                // 1. 앞에 숫자다
                //      a) 열린 괄호 수 > 닫힌 괄호
                //            닫는다
                //      b) 아님
                //          *(추가
                // 앞이 기호다
                //      a) .이 아니면
                //          새로 엶
                //      b) .이면
                //          .없애고 *(
                currentSection.innerText = ""
                previousSection.innerText = ""
            }
            break
        case "%":
            eventListener = () => {
                currentSection.innerText = ""
                previousSection.innerText = ""
            }
            break
        case "back":
            eventListener = () => {
                // console.log("type of inner text", typeof currentSection.innerText)
                const text = currentSection.innerText
                currentSection.innerText = text.slice(0, text.length - 1)
            }
            break

        // 사칙연산은 핸들러 규칙이 같음
        case "÷":
        case "*":
        case "-":
        case "+":
            eventListener = () => {
                const lastCharInNumber = Number(currentSection.innerText.at(-1))
                // console.log("last char:", innerText.at(-1), "in number:", lastCharInNumber, lastCharInNumber >= 0)
                if (lastCharInNumber >= 0) {
                    currentSection.innerText += buttonText
                } else {
                    const trimmedInnerText = currentSection.innerText.slice(0, -1)
                    currentSection.innerText = `${trimmedInnerText}${buttonText}`
                }
            }
            break
        case "=":
            eventListener = () => {
                const formula = currentSection.innerText
                
                // //g 정규표현식
                // ^ 여집합
                // \- (escape)-
                formula.replace(/[^0-9+\-*/().]/g, "");

                previousSection.innerText = formula
                const result = eval(formula);
                currentSection.innerText = result
            }
            break
        case ".":
            eventListener = () => {
                const text = currentSection.innerText
                const lastChar = text.at(-1)
                console.log("---- last char:", lastChar)
                if (lastChar === ".") {
                    return
                }

                if (typeof lastChar !== "number") {
                    currentSection.innerText += "0."
                    return
                }

                // 앞에 아무것도 없으면 그냥 0.

                // 살아남은 건 모두 숫자
                // 000은 0으로 해야, 하지만 0.000에서는 0 더 붙이기 가능
                const splitedArray = text.split("/[\d.]+/")
                console.log("---- splitted array:", splitedArray)

                currentSection.innerText += buttonText
                // if ()
                // if (formulaSection)
                // resultSection.innerText = ""
            }
            break
        case 0:
            // !TODO!
            // . 로직이랑 0 로직이 섞여 있다.
            // 구분해야
            eventListener = () => {
                const text = currentSection.innerText
                const lastChar = text.at(-1)
                console.log("---- last char:", lastChar)
                if (lastChar === ".") {
                    return
                }

                if (typeof lastChar !== "number") {
                    currentSection.innerText += "0."
                    return
                }

                // 앞에 아무것도 없으면 그냥 0.

                // 살아남은 건 모두 숫자
                // 000은 0으로 해야, 하지만 0.000에서는 0 더 붙이기 가능
                const splitedArray = text.split("/[\d.]+/")
                console.log("---- splitted array:", splitedArray)

                currentSection.innerText += buttonText
                // if ()
                // if (formulaSection)
                // resultSection.innerText = ""
            }
            break
        default:
            // consider they are all natural numbers
            eventListener = () => {
                // console.log("---- consider this is a number")
                currentSection.innerHTML += buttonText
            }
        // console.log(`---- WRONG INPUT HOW DID YOU DO THAT??? input: "${innerText}"`)

    }

    button.addEventListener("click", eventListener)
}

const makeButtonWith = (innerText) => {
    const button = document.createElement("button")
    button.innerText = innerText
    button.classList.add("button")
    main.appendChild(button)

    addEventListenerToButton(innerText, button)

    return 1
}

buttonContentArray.forEach((buttonContent) => { makeButtonWith(buttonContent) })

