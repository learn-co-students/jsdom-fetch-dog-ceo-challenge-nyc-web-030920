console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function () {
    fetchDogs();
    loadBreedOptions();
})
function fetchDogs(){
    return fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderDogs(json.message))
}

function renderDogs(json){
    const imageContainer = document.getElementById('dog-image-container')
    console.log(json)
    json.forEach(image => {
        const img = document.createElement('img')
        console.log(image)
        img.src = image
        imageContainer.appendChild(img)
})
}

let breeds = []
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(res => res.json())
        .then(results => {

            breeds = Object.keys(results.message);
            updateBreedList(breeds);
            addBreedSelectListener();
        });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'palevioletred';
}