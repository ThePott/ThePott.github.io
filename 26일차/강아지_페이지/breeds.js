// import makeError from './errorHandler.js';

const url = "https://dog.ceo/api/breeds/image/random/44"

const main = document.querySelector("#main")
const dogBoxMany = document.getElementsByClassName("dog-box")
const breedSelect = document.querySelector("#breed-select")
/** includes로 확인해서 unique한 값만 추가해야 함 */
const breedUniqueArray = []

const filterInput = document.querySelector("#filter-input")
const resetButton = document.querySelector("#reset-button")


// ======== handle error =======
const makeError = (response) => {
    const statusCode = response.status
    const statusText = response.statusText
    
    const error = new Error()

    switch (statusCode) {
        case 400:
            error.message = statusText ? statusText : "Bad Request"
            error.name = "BadRequestError"
        case 401:
            error.message = statusText ? statusText : "UnauthorizedError"
            error.name = "UnauthorizedError"
        case 403:
            error.message = statusText ? statusText : "Forbidden"
            error.name = "ForbiddenError"
        case 404:
            error.message = statusText ? statusText : "Not Found"
            error.name = "NotFoundError"
        case 500:
            error.message = statusText ? statusText : "Internal Server Error"
            error.name = "InternalServerError"
        default:
            error.message = statusText ? statusText : "UNKNOWN ERROR"
            error.name = "UnknownError"
    }

    console.log("---- error handling:", error)
    return error
}

// ======== reset ========
resetButton.addEventListener("click", () => {
    main.innerHTML = ""
    breedSelect.innerHTML = ""
    breedUniqueArray.splice(0)

    getDogUrlArray()
})

// ======== dog select ========
const addBreed = (url) => {
    const firstSplited = url.split("/breeds/")[1]
    const breed = firstSplited.split("/")[0]

    if (!breedUniqueArray.includes(breed)) {
        breedUniqueArray.push(breed)
    }

    return breed
}

const updateBreedSelect = () => {
    const sortedBreedUniqueArray = breedUniqueArray.sort()

    const optionForAll = document.createElement("option")
    optionForAll.value = ""
    optionForAll.textContent = "all"
    breedSelect.appendChild(optionForAll)

    for (const breed of sortedBreedUniqueArray) {
        const option = document.createElement("option")
        option.value = breed
        option.textContent = breed
        breedSelect.appendChild(option)
    }
}

const filterDogBox = (breed) => {
    // filterInput.value = ""

    if (breed === "") {
        for (const dogBox of dogBoxMany) {
            dogBox.style = "display: block;"
        }
        return
    }

    for (const dogBox of dogBoxMany) {
        const classListString = dogBox.classList.value
        const isSelected = classListString.includes(breed)

        dogBox.style = isSelected ? "display: block;" : "display: none;"
    }
}

breedSelect.addEventListener("change", (event) => {
    filterInput.value = ""
    
    const breed = event.target.value
    filterDogBox(breed)
})

// ======== dog filter input ========
filterInput.addEventListener("keydown", (event) => {
    const text = event.target.value
    if (event.key === "Enter") {
        console.log("---- submit!", event.target.value)
    }

    filterDogBox(text)
})

// ======== dog box ========
const addDogBox = (url, breed) => {
    const dogBox = document.createElement("img")
    dogBox.src = url
    dogBox.classList.add("dog-box")
    dogBox.classList.add(breed)
    main.appendChild(dogBox)
}

const getDogUrlArray = async () => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            const error = makeError(response)
            throw error
        }

        const body = await response.json()
        const urlArray = body.message

        urlArray.forEach(url => {
            const breed = addBreed(url)
            addDogBox(url, breed)
        });

        updateBreedSelect()

    } catch (error) {
        console.log("---- ERROR:", error)
        alert("오류가 발생했습니다! 잠시 뒤에 다시 시도해주세요.")
    }
}

getDogUrlArray()

