
window.addEventListener("DOMContentLoaded", () => {

    console.log("DOM Loaded")
    console.log('%c HI', 'color: firebrick')

// Challenge 1
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => loadDogs(json))

    function loadDogs(obj){
        // console.dir(array.message[0])
        const array = obj.message
        array.forEach(element => {
            const dogContatiner = document.getElementById("dog-image-container")
            const img = document.createElement("img")
            img.src = element
            dogContatiner.append(img)
        });
    }
// End of Challenge 1
// Challenge 2
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => loadBreeds(json))
    // The UL that we will be adding all breeds to
    const breedsContainer = document.getElementById("dog-breeds")
    
    function loadBreeds(json){
        const breeds = json.message
        
        for(let key in breeds){
            let value = breeds[key]
            const li = document.createElement("li")
            li.textContent = `${key} ${value}`
            breedsContainer.append(li)
        }
    }
// End of Challenge 2
// Challenge 3
    breedsContainer.addEventListener("click", function(event){
        console.log(event.target)
        const li = event.target
        li.style.color = "purple"
    })
// End of Challeng 3
// Challenge 4
    const dropDown = document.getElementById("breed-dropdown")
    dropDown.onchange = function(){
        const value = dropDown.value
        if (value === 'a'){
            filterBreeds('a')
        } else if (value === 'b'){
            filterBreeds('b')
        } else if (value === 'c'){
            filterBreeds('c')
        } else if (value === 'd'){
            filterBreeds('d')
        }
    }

    //given a string
    //check each breed to see if it starts with the string. 
    //if it matches show it. 
    //if it doesn't go to next element
    function filterBreeds(str){
        console.log(breedsContainer)
        const list = Array.from(breedsContainer.children)
        for( let el of list){
            if(el.textContent[0] === str){
                el.hidden = false
            } else {
                el.hidden = true
            }
        }
    }
});
