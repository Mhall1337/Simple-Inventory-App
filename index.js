console.log('hello')

function postItem(obj){
    fetch('http://localhost:3000/beerInv',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(obj)
  })
  }

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
    createInput(quantDiv, item, paragraph)
    
    const colorDiv = document.createElement('div')
    colorDiv.textContent = "Color:  " + item.color
    inventoryDiv.append(colorDiv)

    const acidDiv = document.createElement('div')
    acidDiv.textContent = "Alpha Acid %:  " + item.alphaAcid
    inventoryDiv.append(acidDiv)
}

//created our input & submit that will go along with each individual inventory item
function createInput(element, item, paragraph){
    const quantInput = document.createElement('input')
    quantInput.id = item.id
    quantInput.class = 'quantityInput'
    quantInput.placeholder = 'Amnt to Add or Remove'
    quantInput.type = 'text'
    const button = document.createElement('button')
    button.textContent = 'Add/Remove'
    button.id = item.id
    element.append(quantInput)
    element.append(button)
    button.addEventListener('click', e => console.log(e))
}
// handle adding an item to inventory
document.querySelector("#addItem > input[type=Submit]").addEventListener('click', e => console.log(e))
// function addToInventory(obj){
//     e.preventDefault()

// let  newInventoryItem = {
//             itemName:  (selected input val),
//             quantity:  (selected input val),
//             color: (selected input val),
//             alphaAcid: (selected input val)
// }

// call our post function here with object from inputs
//     postItem(newInventoryItem)
// }
