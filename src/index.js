
// create a global array variable
let dogBreeds = []

document.addEventListener('DOMContentLoaded', (event) => {
    loadImage()
    loadAllDogs()
    addListeners()
    
})

function loadImage() {
    // fetch(imgUrl)
    //     .then(response => response.json())
    //     .then(animals => {createNew(animals)})  // testing out just sending json
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(response => response.json())
        .then(animals => {animals.message.forEach(eachPic => createNewImg(eachPic))
        })
}


function createNewImg(imageUrl) {
    // console.log(imageUrl)
    // json.message.forEach(eachHash => console.log(eachHash))
    let dogContainer = document.querySelector('#dog-image-container')
    let dogImage = document.createElement('img')
    dogImage.src = imageUrl
    dogContainer.appendChild(dogImage)
}

function loadAllDogs() {

    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(response => response.json())
        .then(dogs => { 
            // since json has an array of objects (hashes), we need to pull
            // the keys to iterate thru
            dogBreeds = Object.keys(dogs.message)
            // now we pass each value to create a new LI on page
            dogBreeds.forEach(dogBreed => addBreed(dogBreed))
            // i guess put event listener for dropdown here? doesn't seem to make difference
            addDropdownListener()
        })

}

function addBreed(breed) {
    // add all breeds to UL
    const ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed
    ul.appendChild(li)
}

function addListeners () {
    // put listeners on LI's in UL
    const ul = document.querySelector('#dog-breeds')
    ul.addEventListener('click', function(event) {
        if (event.target.style.color === 'red') {
            event.target.style.color = 'black'
        } else {
            event.target.style.color = 'red'
        }
    })
}

function addDropdownListener() {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
    const dropDown = document.querySelector("#breed-dropdown")
    dropDown.addEventListener("change", (event) => {
        filterDogBreed(event.target.value)
    })
}

function filterDogBreed(dogBreedLetter) {
    const ul = document.querySelector('#dog-breeds')
        // remove all children from UL - could be abstraced to own function
        let child = ul.lastElementChild
            while(child) {
                ul.removeChild(child)
                child = ul.lastElementChild
            }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    // filter global array by user selected letter, using .startsWith
    let breedSelect = dogBreeds.filter(singleBreed => singleBreed.startsWith(dogBreedLetter))
    breedSelect.forEach(breed => addBreed(breed))

}