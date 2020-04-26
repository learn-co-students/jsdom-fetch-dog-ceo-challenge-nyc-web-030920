const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


document.addEventListener('DOMContentLoaded', (event) => {
    let list = document.getElementById('dog-breeds')
    let keyValues

    fetch(imgUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            addImage(json.message)
        })

    fetch(breedUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            keyValues = Object.keys(json.message) // Array of key values inside of json
            keyValues.forEach(element => {
                addBreedLi(element, list)
            });
        });
    const sortOption = document.getElementById('breed-dropdown') // <select> </select>
    sortOption.addEventListener('change', event => { //change can work. auto at 'a' 
        let input = event.target.value
        console.log(input)
        list.innerHTML = '' // cleared all li's in ul 
        keyValues.forEach(element => {
            if (element[0] === input) {
                addBreedLi(element,list)
            }
        })
    })
});


function addImage(array) {
    const main = document.querySelector("#dog-image-container")

    array.forEach(function (element) {
        let img = document.createElement('img')
        let src = document.createAttribute('src')
        src.value = element
        img.setAttributeNode(src)
        main.appendChild(img)
    })
}

function addBreedLi(element, list) {
    let liElement = document.createElement('li')  // <li></li>
    liElement.innerText = element // <li> "breed" </li>
    list.appendChild(liElement) // <ul id = "dog-breed"> <li> "breed" <li> </ul>

    liElement.addEventListener('click', event => {
        liElement.style.color = "#FF00FF"
    })
}