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
    // ===== TODO ======
    // 1. text 바깥으로 빼야
    // 2. 그리고 연산기호는 키보드 특수문자로 변환해야
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

                // //g 정규표현식(regex) 글로벌, find all matches
                // ^ 여집합
                // \- (escape)-
                formula.replace(/[^0-9+\-*/().]/g, "");

                const result = eval(formula);
                if (result === formula) { return }

                previousSection.innerText = formula

                currentSection.innerText = result
            }
            break
        case ".":
            eventListener = () => {
                const text = currentSection.innerText
                const lastChar = text.at(-1)

                if (lastChar === ".") {
                    return
                }

                if (lastChar === ")") {
                    currentSection.innerText += "*0."
                    return
                }

                const lastCharInNumber = Number(lastChar)
                if (Number.isNaN(lastCharInNumber)) {
                    currentSection.innerText += "0."
                    return
                }

                const splitedArray = text.split(/[+\-*/()]+/)
                const lastNumber = splitedArray.at(-1)

                if (lastNumber.includes(".")) {
                    return
                }

                currentSection.innerHTML += buttonText
            }
            break
        case 0:
            eventListener = () => {
                // !TODO!
                // . 로직이랑 0 로직이 섞여 있다.
                // 구분해야
                const text = currentSection.innerText
                const lastCharInNumber = parseInt(text.at(-1))

                if (Number.isNaN(lastCharInNumber)) {
                    currentSection.innerText += buttonText
                    console.log("---- last not number:", text.at(-1), lastCharInNumber)
                    return
                }

                // 살아남은 건 모두 숫자
                const lastNumberString = text.split(/[^0-9.]+/g).at(-1)
                if (lastNumberString === "0") {
                    return
                }

                currentSection.innerText += buttonText
            }
            break
        default:
            // consider they are all natural numbers (non zero number)
            eventListener = () => {
                const text = currentSection.innerHTML
                if (text.at(-1) === ")") {
                    currentSection.innerHTML += `*${buttonText}`
                    return
                }
                currentSection.innerHTML += buttonText
            }
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

