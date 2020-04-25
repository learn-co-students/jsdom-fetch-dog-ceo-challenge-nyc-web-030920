console.log('%c HI', 'color: firebrick')
let breeds = [];


document.addEventListener('DOMContentLoaded', function () {
    fetchDogPic();
    addDogBreed();
    addListenerToBody();
    filterBreed();
})



function fetchDogPic() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            result["message"].forEach(function (img) {
                addPic(img);
            })
        });
}

function addPic(imageLink) {
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = imageLink;
    container.appendChild(newImageEl);
}

function addDogBreed() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            breeds = Object.keys(result["message"]);
            breeds.forEach(function (breed) {
                createDogBreedList(breed);
            })
        })
}

function createDogBreedList(breedName) {
    const dogContainer = document.querySelector('#dog-breeds');
    let newLi = document.createElement('li');
    newLi.innerText = breedName;
    newLi.style.cursor = 'pointer';
    dogContainer.append(newLi);
}

function addListenerToBody() {
    const body = document.querySelector('body');
    body.addEventListener('click', function (event) {
        let eventTarget = event.target;
        if (eventTarget.tagName === 'LI') {
            eventTarget.style.color = 'red';
        }
    });
}

//add a function that filter the result based on user's choice from dropdown menu
function filterBreed() {
    const dropDownMenu = document.querySelector('#breed-dropdown');
    dropDownMenu.addEventListener('change', function(event){
        let startChar = event.target.value;
        const allDogLi = document.querySelector('#dog-breeds').querySelectorAll('li');
        allDogLi.forEach(li => li.remove());
        filterResult(startChar);
    })
}

function filterResult(firstIndex) {
    let filteredBreed = [];
    for (let i = 0; i < breeds.length; i++) {
        if (breeds[i][0] === firstIndex) {
            filteredBreed.push(breeds[i]);
        }
    }
    filteredBreed.forEach(function(breed){        
        createDogBreedList(breed);
    })
}

