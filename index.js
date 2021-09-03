console.log('hello')

function fetchItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => beerObj.forEach(value => appendItem(value)))
}
fetchItem()

//below we are appending our added items to the page and adding event listeners
function appendItem(value){
    const invDiv = document.createElement('form')
    invDiv.className = 'invDiv'
    invDiv.textContent = "Item Name:  " + value.itemName
    document.querySelector("body > section").append(invDiv)

    const quantDiv = document.createElement('div')
    quantDiv.textContent = "Quantity:  " + value.quantity
    invDiv.append(quantDiv)

    const colorDiv = document.createElement('div')
    colorDiv.textContent = "Color:  " + value.color
    invDiv.append(colorDiv)

    const acidDiv = document.createElement('div')
    acidDiv.textContent = "Alpha Acid %:  " + value.alphaAcid
    invDiv.append(acidDiv)
}