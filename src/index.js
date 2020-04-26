console.log('%c HI', 'color: firebrick')

//state variable for showing dog Lis
let dogLis = false;

//state variable for dog Li color
// let dogLiColor = false;

//API endpoint to retrieve data
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

//main DIV to append data
const dogDiv = document.getElementById('dog-image-container')

//function expression receives the array and creates elements and appends to main DIV
const addDog = (arr) => {
  arr.forEach(dog => {
    const img = document.createElement('img')
    const br = document.createElement('br')
    img.src = dog
    dogDiv.append(img, br)
  })
}

//function expression returns an object with a key of 'message' and value of an array of dog breeds
const fetchData = (apiEndpoint) => {
  return fetch(apiEndpoint).then(resp => resp. json())
}

//invoke function to retreive data and pass to addDog function
fetchData(imgUrl).then(json => addDog(json.message))

//another API endpoint to fetch dog breeds
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

//DIV to append the dog breeds
const dogsUl = document.getElementById('dog-breeds')


function addDogList(json){
  for(const breed in json){
    const li = document.createElement('li')
    li.id = breed
    li.className = 'parent'
    li.innerText = breed
    dogsUl.appendChild(li)

    if (json[breed].length > 0) {
      const ul = document.createElement('ul')

      for(const dog of json[breed]){
        const li = document.createElement('li')
        li.id = dog
        li.textContent = dog
        ul.appendChild(li)
        let parentLi = document.getElementById(`${breed}`)
        parentLi.appendChild(ul)
      }
      ul.style.display = 'none'
    }
  }
}

fetchData(breedUrl).then(json => addDogList(json.message))

dogsUl.addEventListener('click', event => {
  if (event.target.className === 'parent') {
    if (event.target.children.length > 0) {
      let li = event.target
      
      let ul = event.target.childNodes[1]
      toggleDisplay(ul)
      
      let dogLis = ul.childNodes
      
      dogLis.forEach((dogLi) => {
        dogLi.addEventListener('click', () => {
          let color = prompt('What color do you want?')
          toggleColor(dogLi, color)
        })
      })
    }
  }
})


const toggleDisplay = (ul) => {
  dogLis = !dogLis

  if (dogLis) {
    ul.style.display = 'block'
  } else {
    ul.style.display = 'none'
  }
}

const toggleColor = (li, textColor) => {
  // dogLiColor = !dogLiColor

  // if (dogLiColor) {
  //   li.style.color = `${textColor}`
  // } else {
  //   alert('sorry don\'t have that color')
  //   li.style.color = 'black'
  // }
  li.style.color = `${textColor}`
}


const dropDownMenu = document.getElementById('breed-dropdown')
const mainOption = document.createElement('option')
mainOption.value = 'select breed'
mainOption.innerText = 'select breed'

const optionA = dropDownMenu.firstElementChild

optionA.insertAdjacentElement('beforebegin', mainOption)

// let originalChildren = (dogsUl.childNodes).splice()
console.dir(dogsUl)
const ulCopy = dogsUl.childNodes
console.log(ulCopy)
console.log(dogsUl.children)

function duplicate(arr) {
  let copy = []
  for(const ele of arr) {
    copy.push(ele)
  }
  return copy
}

const originalUl = duplicate(ulCopy)

dropDownMenu.addEventListener('change', (event) => {
  let option = event.target.value
  console.log(option)

  //reset 
  resetSelection()
  

  switch (option) {
    case 'select breed':
      // dogsUl.getElementsByClassName('parent').forEach(n => {
      //   n.style.display = 'block';
      // })
      break;
    case 'a':
      filterBreed(dogsUl, 'a');
      break;
    case 'b':
      filterBreed(dogsUl, 'b');
      break;
    case 'c':
      filterBreed(dogsUl, 'c');
      break;
    case 'd':
      filterBreed(dogsUl, 'd');
      break;
  }
  
})

const filterBreed = (arr, option) => {
  arr.querySelectorAll('*').forEach(n => {
    if (n.id[0] !== option) {
      console.log(n)
      console.log(n.style.display)
      n.style.display = 'none';
    }
  })
}

const resetSelection = () => {
  dogsUl.querySelectorAll('*').forEach(n => {
    n.style.display = 'block'
  })
}