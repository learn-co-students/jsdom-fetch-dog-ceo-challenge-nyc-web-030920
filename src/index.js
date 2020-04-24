console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", event => {
    loadImages();
    loadBreeds();

    document.addEventListener("click", event => {
        if(event.target.dataset.breed){
            console.log("breed");
            toggleColor(event.target);
        }
    });

    addDropdownListener();
});

function loadImages(){
    const imageContainer = document.getElementById("dog-image-container");

    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        data.message.forEach(img => addImageToDOM(img, imageContainer))
    });
}

function addImageToDOM(path, container){
    const img = document.createElement("img");
    img.setAttribute("src", path);
    container.append(img);
}

function loadBreeds(){
    const breedList = document.getElementById("dog-breeds");

    fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
        Object.keys(data.message).forEach(breed => {
            addBreedToList(breed, breedList);
        });
    })
    .catch(err => console.log("error", err));
}

function addBreedToList(breed, list){
    // console.log(breed, list);
    const li = document.createElement("li");
    li.dataset.breed = breed;
    li.textContent = breed;
    list.append(li);
}

function toggleColor(li){
    if (li.style.color === "red"){
        li.style.color = "";
    }
    else{
        li.style.color = "red";
    }
}

function addDropdownListener(){
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");
    dropdown.addEventListener("change", event => {
        console.log("change", dropdown.value);
        filterBreeds(dropdown.value, breedList);
    });
}

function filterBreeds(letter, list){
    console.log(letter);
    Array.from(list.children).forEach(li => {
        // console.log(li.dataset.breed);
        if(li.dataset.breed[0] === letter){
            console.log(li.dataset.breed);
            li.style.display = "list-item";
        }
        else{
            li.style.display = "none";
        }
    })
}