console.log('hello')

function fetchItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => beerObj.forEach(item => appendItem(item)))
}
fetchItem()

//below we are appending our added items to the page and adding event listeners
function appendItem(item){
    const inventoryDiv = document.createElement('div')
    inventoryDiv.className = 'inventoryDiv'
    inventoryDiv.textContent = "Item Name:  " + item.itemName
    document.querySelector("body > section").append(inventoryDiv)

    const quantDiv = document.createElement('div')
    //add <p> for text content to get out of string??
    const paragraph = document.createElement('p')
    paragraph.textContent = "Quantity:  " + `${item.quantity}`
    quantDiv.append(paragraph)
    inventoryDiv.append(quantDiv)
    createInput(quantDiv, item)
    
    const colorDiv = document.createElement('div')
    colorDiv.textContent = "Color:  " + item.color
    inventoryDiv.append(colorDiv)

    const acidDiv = document.createElement('div')
    acidDiv.textContent = "Alpha Acid %:  " + item.alphaAcid
    inventoryDiv.append(acidDiv)
}

//created our input & submit that will go along with each individual inventory item
function createInput(element, item){
    const quantInput = document.createElement('input')
    quantInput.id = item.id
    quantInput.class = 'quantityInput'
    quantInput.placeholder = 'Amnt to Add or Remove'
    quantInput.type = 'number'
    const button = document.createElement('button')
    button.textContent = 'Add/Remove'
    button.id = item.id
    element.append(quantInput)
    element.append(button)
    // button.addEventListener('click', e => {
    //     e.preventDefault()
    //     element.textContent = "Quantity:  " + `${item.quantity += quantInput.value}`

    //     }
    //)
}
//add inventory item event listener to add/remove quantity
