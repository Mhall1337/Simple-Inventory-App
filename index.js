console.log('hello')
//post an item
function postItem(obj){
    fetch('http://localhost:3000/beerInv',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(beerObj => console.log(beerObj))
  }

//fetch an item
function fetchItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => beerObj.forEach(item => appendItem(item)))
}
fetchItem()

//below we are appending our added items to the page and adding event listeners
function appendItem(item){
    let inventoryDiv = document.createElement('form')
    inventoryDiv.className = 'inventoryDiv'
    inventoryDiv.textContent = "Item Name:  " + item.itemName
    document.querySelector("body > section").append(inventoryDiv)

    const quantDiv = document.createElement('div')
    //add <p> for text content to get out of string??
    let paragraph = document.createElement('p')
    paragraph.textContent = "Quantity:  " + item.quantity
    console.log(item.quantity)
    quantDiv.append(paragraph)
    inventoryDiv.append(quantDiv)
    //createInput(quantDiv, item)
//add input <div>
    let quantInput = document.createElement('input')
    quantInput.id = item.id
    quantInput.class = 'quantityInput'
    quantInput.placeholder = 'Amnt to Add or Remove'
    quantInput.type = 'text'
    let button = document.createElement('button')
    button.textContent = 'Add/Remove'
    button.id = item.id
    quantDiv.append(quantInput)
    quantDiv.append(button)

    //add button event listener
    buttonEvent(button, item, quantInput, paragraph)
    //create color <div>
    let colorDiv = document.createElement('div')
    colorDiv.textContent = "Color:  " + item.color
    inventoryDiv.append(colorDiv)
    //create Alpha Acid <div>
    let acidDiv = document.createElement('div')
    acidDiv.textContent = "Alpha Acid %:  " + item.alphaAcid
    inventoryDiv.append(acidDiv)
}

//created our input & submit that will go along with each individual inventory item
// function createInput(element, item){
//     const quantInput = document.createElement('input')
//     quantInput.id = item.id
//     quantInput.class = 'quantityInput'
//     quantInput.placeholder = 'Amnt to Add or Remove'
//     quantInput.type = 'text'
//     const button = document.createElement('button')
//     button.textContent = 'Add/Remove'
//     button.id = item.id
//     element.append(quantInput)
//     element.append(button)
//     button.addEventListener('click', e => console.log(e))

//     //path[1].childNodes[1].value
// }
// handle adding an item to inventory
document.querySelector("#addItem > input[type=Submit]").addEventListener('click', e => addToInventory(e))
function addToInventory(e){
    e.preventDefault()
let  newInventoryItem = {
        itemName: document.querySelector("#item_name").value,
        quantity: document.querySelector("#quantity").value,
        color: document.querySelector("#color").value,
        alphaAcid: document.querySelector("#acid").value
     }
     appendItem(newInventoryItem)
    postItem(newInventoryItem)
}

function buttonEvent(button, item, quantInput, paragraph){
    button.addEventListener('click', e => {
        e.preventDefault()
        if(quantInput.value < 0){
        paragraph.textContent = "Quantity:  " + `${item.quantity -= quantInput.value}`
    }else if(quantInput.value > 0){
        paragraph.textContent = "Quantity:  " + (item.quantity -= (quantInput.value *-1))
    }
    quantInput.value = ''
    }
    
    )
}