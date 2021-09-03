console.log('hello')

function fetchItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => beerObj.forEach(item => appendItem(item)))
}
fetchItem()

//below we are appending our added items to the page and adding event listeners
function appendItem(item){
    const invDiv = document.createElement('form')
    invDiv.className = 'invDiv'
    invDiv.textContent = "Item Name:  " + item.itemName
    document.querySelector("body > section").append(invDiv)

    const quantDiv = document.createElement('div')
    quantDiv.textContent = "Quantity:  " + item.quantity
    createInput(quantDiv, item)
    invDiv.append(quantDiv)

    const colorDiv = document.createElement('div')
    colorDiv.textContent = "Color:  " + item.color
    invDiv.append(colorDiv)

    const acidDiv = document.createElement('div')
    acidDiv.textContent = "Alpha Acid %:  " + item.alphaAcid
    invDiv.append(acidDiv)
}

//created our input & submit that will go along with each individual inventory item
function createInput(element, item){
    const quantInput = document.createElement('input')
    quantInput.id = item.id
    quantInput.class = 'quantityInput'
    quantInput.placeholder = 'Amnt to Add or Remove'
    quantInput.type = 'number'
    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Add/Remove'
    submit.id = item.id
    element.append(quantInput)
    element.append(submit)
    submit.addEventListener('click', e => {
        e.preventDefault()
        console.log(e)})
}

//add inventory item event listener to add/remove quantity
