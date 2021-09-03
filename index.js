console.log('hello')

function fetchItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => beerObj.forEach(value => appendItem(value)))
}
fetchItem()

//below we are appending our added items to the page and adding event listeners
function appendItem(value){
    const invDiv = document.createElement('div')
    invDiv.textContent = value.itemName
    document.querySelector("body > h3").append(invDiv)

    const quantDiv = document.createElement('div')
    quantDiv.textContent = value.quantity
    invDiv.append(quantDiv)

    const colorDiv = document.createElement('div')
    colorDiv.textContent = value.color
    quantDiv.append(colorDiv)

    const acidDiv = document.createElement('div')
    acidDiv.textContent = value.alphaAcid
    colorDiv.append(acidDiv)
}