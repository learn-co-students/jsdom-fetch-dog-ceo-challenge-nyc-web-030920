console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

window.addEventListener('DOMContentLoaded', () => {
    const breedContainer = document.querySelector('#dog-breeds')

    const fetchDogs = () => {
        fetch(imgUrl)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs.message))
    };
    
    const fetchDogBreeds = () => {
        fetch(breedUrl)
        .then(response => response.json())
        .then(breeds => {
            renderDogBreeds(breeds.message)
            filterBreeds(breeds.message)
        })
    };
    
    const renderDogs = (dogs) => {
        const imageContainer = document.querySelector("#dog-image-container")
        dogs.forEach(dog => {
            const imgTag = document.createElement('img')
            imgTag.src = dog
            imageContainer.append(imgTag)
        })
    };
    
    const renderDogBreeds = (breeds) => {
        for (const breed in breeds){
            const breedLi = document.createElement('li')
            breedLi.textContent = breed
            breedLi.style.cursor = 'default'
            breedContainer.append(breedLi)
        }
    };

    const colorChange = () => {
        breedContainer.addEventListener('click', function(event){
            let selectedBreed = event.target
            selectedBreed.style.color = 'red'
        })
    };

    const filterBreeds = (breeds) => {
        const dropdown = document.querySelector('#breed-dropdown')
        dropdown.addEventListener('change', function(){
            breedContainer.innerHTML = ''
            for (const breed in breeds){
                if(dropdown.value === breed.charAt(0)){
                    const breedLi = document.createElement('li')
                    breedLi.textContent = breed
                    breedLi.style.cursor = 'default'
                    breedContainer.append(breedLi)
                }
            }
        })
    }
    
    fetchDogs()
    fetchDogBreeds()
    colorChange()
})