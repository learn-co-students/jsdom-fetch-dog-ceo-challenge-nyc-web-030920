console.log('%c HI', 'color: firebrick')


window.addEventListener('DOMContentLoaded', (event)=> {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(imgUrl).then(resp=> resp.json()).then(json=> renderImages(json))
    fetch(breedUrl).then(resp=>resp.json()).then(json=> renderBreeds(json))
    breedClicks()


    const dropdown= document.getElementById("breed-dropdown")
    dropdown.addEventListener("change", filterResult)
})
function breedClicks(){
const breedList= document.getElementById("dog-breeds")
breedList.addEventListener('click', event=>{
event.target.style.color="red"
})

}
function renderBreeds(json){
    const breedDiv= document.getElementById("dog-breeds")
    for(const breedName of Object.keys(json.message)){
        let breed= document.createElement("li")
        breed.className = "breed"
        breed.innerText = breedName
        breedDiv.appendChild(breed)
    }
}
function renderImages(json){
  
    const imageDiv = document.getElementById("dog-image-container")
    
    for(const url of json.message){
        let img = document.createElement("img")
       img.src = url
       imageDiv.appendChild(img)

    }
        

}

function filterResult(obj){
    let char = obj.target.value
    const breedList= document.getElementsByClassName("breed")
    console.log(breedList[0].innerText[0])
    for(const breed of breedList){
        if(breed.innerText[0] === char){
            breed.style.display = "block";
        }else{
            breed.style.display = "none";
        }
    }
}