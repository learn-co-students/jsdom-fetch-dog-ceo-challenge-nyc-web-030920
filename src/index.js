console.log('%c HI', 'color: firebrick')
let breedKeys 

document.addEventListener("DOMContentLoaded", function(){
    loadDogImages();
    loadDogBreeds();
    addListenerToDogs();
})

function addImage(dogUrl) {
    const container = document.getElementById('dog-image-container');
    let image = document.createElement('img');
    image.src = dogUrl;
    container.appendChild(image);
}

function loadDogImages(){
    const dogImageUrl = 'https://dog.ceo/api/breeds/image/random/4'
    fetch(dogImageUrl)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(json) {
        json.message.forEach(image => addImage(image))
    })
}

function addDogBreeds(breed){
    const breedContainer = document.getElementById('dog-breeds')
    const li = document.createElement('li');
    li.textContent = breed;
    li.style.cursor = "pointer";
    breedContainer.append(li);

    li.addEventListener("click", function(event){
        
        if(event.target.style.color === "red"){
            event.target.style.color = "black";
        }
        else{
            event.target.style.color = "red";
        }
    })
}
  
function loadDogBreeds(){
    const breedURL = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedURL)
    .then(function(resp){
        return resp.json()
    })
    .then(function(json) {
        console.log(json.message);
       breedKeys = Object.keys(json.message);
       breedKeys.forEach(breed => addDogBreeds(breed))
    })
}

function addListenerToDogs(){
    console.log(breedKeys)
    let dogDropdown = document.getElementById('breed-dropdown')

    dogDropdown.addEventListener("change", function(event){
        
        document.querySelector('#dog-breeds').innerHTML = ""
        let input = event.target.value 
        filterDogs(input);
    })
}

function filterDogs(input){
    breedKeys.filter(breed => {
        if(breed.startsWith(input)){
            addDogBreeds(breed);
        }
        else if(input === "all"){
            addDogBreeds(breed);
        }
    });
}

