document.querySelector('.searchButton').addEventListener('click', drinkRequest)
document.querySelector('.randomButton').addEventListener('click', randomDrinkRequest)
document.addEventListener('DOMContentLoaded', drinkRequest)

const alertBootstrap = (message, type) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }

async function drinkRequest(){
    const cocktail = document.querySelector('input').value
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    console.log(url)

    try{
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        clearDOM()

        if (data.drinks === null){
            alertBootstrap('Drink not found.','danger')
        }else{
            data.drinks.forEach(drinks => populateDrink(drinks))
        }

    }catch(error){
        console.log(error)
    }
}

async function randomDrinkRequest(){

    try{
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        const data = await response.json()
        console.log(data)
        clearDOM()

        data.drinks.forEach(drinks => populateDrink(drinks))

    }catch(error){
        console.log(error)
    }
}

function populateDrink(drinks){
    const cards = document.createElement('div')
    const cocktailSection = document.querySelector('.cocktails')
    cards.classList.add('col')

    cards.innerHTML = `
        <div class="card h-100 text">
            <div>
                <img src=${drinks.strDrinkThumb} class="card-img-top" alt="${drinks.strDrinkThumb}">
            </div>
            <div class="card-body">
                <h2 class="card-title text-white bg-success text-center">${drinks.strDrink}</h2>
                <h3 class="text-success text-center">Ingredients</h3>
                <ul class="text-start">${ingredients(drinks)}</ul>
                <h3 class="text-success text-center">Instructions</h3>
                <p>${drinks.strInstructions}</p>
            </div>
        </div>
    `
    cocktailSection.appendChild(cards)
}

function ingredients(drinks){
    let str = ''
    for (let i = 1; i<=15;i++){
        const ingredients = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if (drinks[ingredients]){
        str += `<li>${drinks[measure] || ""} ${drinks[ingredients]}</li>`
        }
    }
    console.log(str)
    return str
}

function clearDOM(){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const cocktailSection = document.querySelector('.cocktails')

    while (cocktailSection.firstChild)
    cocktailSection.removeChild(cocktailSection.firstChild)

    while (alertPlaceholder.firstChild)
    alertPlaceholder.removeChild(alertPlaceholder.firstChild)
}