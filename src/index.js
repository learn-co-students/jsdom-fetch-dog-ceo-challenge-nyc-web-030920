console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let breeds = []
document.addEventListener('DOMContentLoaded', (event) => {
  fetchBreeds()
  loadImages()
  addBreedSelectListener()
  
})


function loadImages() {
  fetch(imgUrl)
    .then(res => res.json())
    .then(json => {
      json.message.forEach(image => addImage(image))
    });
}


function addImage (img) {
  let container = document.getElementById('dog-image-container')
  container.innerHTML += `
  <ul class="image-list">
    <p><img src="${img}"></p>
  </ul>`
}

// fetch 
function fetchBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(res => res.json())
  .then(json => {
    breeds = Object.keys(json.message);
      // for(breed in json.message)
      console.log(breeds)
      breeds.forEach(breed => renderBreed(breed))
    });
}
// render breeds to the dom 
function renderBreed (breed) {
  let ulContainer = document.getElementById('dog-breeds')
  let li = document.createElement('li')

  li.textContent = breed
  li.style.cursor = 'pointer';
  ulContainer.append(li)
  li.addEventListener('click', toggleColor)
}

// changes color of clicked breed name. 
function toggleColor(e) {
  if (e.target.style.color === 'violet') {
    e.target.style.color = 'black'
  } else {
    e.target.style.color = 'violet'
  }
}

function filterBreedsByFirstLetter(selectedLetter) {
  breeds.filter(breed => {
    if (breed.startsWith(selectedLetter)) {
      renderBreed(breed)
    }
  })
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', (event) => {
    let input = event.target.value
    document.getElementById('dog-breeds').innerHTML = ''
    filterBreedsByFirstLetter(input);
  });
}
/////////////////////
// style="diplay" 
// set style="display:none"
/////////////////////

function filterBreeds(letter, list){
  console.log(letter);
  Array.from(list.children).forEach(li => {
      // console.log(li.dataset.breed);
      if(li.dataset.breed[0] === letter){
          console.log(li.dataset.breed);
          li.style.display = “list-item”;
      }
      else{
          li.style.display = “none”;
      }
  })
}

// test test 


