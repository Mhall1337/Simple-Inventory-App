
console.log('hello')
//patch an item
function patchItem(obj){
    fetch(`http://localhost:3000/beerInv/${obj.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(beerObj => console.log(beerObj))
  }

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
    let inventoryForm = document.createElement('form')
    inventoryForm.className = 'inventoryForm'
    inventoryForm.textContent = "Item Name:  " + item.itemName
    document.querySelector("body > section").append(inventoryForm)

//<div> containing <button>, <input>, and quantity <p>
    const quantDiv = document.createElement('div')

//add <p> for text content to get out of string??
    let paragraph = document.createElement('p')
    paragraph.textContent = "Quantity:  " + item.quantity
    quantDiv.append(paragraph)
    inventoryForm.append(quantDiv)
    
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

//create color <div>
    let colorDiv = document.createElement('div')
    colorDiv.textContent = "Color:  " + item.color
    inventoryForm.append(colorDiv)

//create Alpha Acid <div>
    let acidDiv = document.createElement('div')
    acidDiv.textContent = "Alpha Acid %:  " + item.alphaAcid
    inventoryForm.append(acidDiv)  

//button event listener with PATCH
    buttonEvent(button, item, quantInput, paragraph)
}

//     button.addEventListener('click', e => {
//         e.preventDefault()
//         console.log(item.quantity)
//         paragraph.textContent = "Quantity:  " + (item.quantity -= (quantInput.value *-1))
//     patchItem(item)   
//     quantInput.value = ''
//     }
//     )
// }

// handle adding an item to inventory database
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

function lowItemColorChange(item){
   const forms = document.querySelectorAll('.inventoryForm')
   //const lowForms = forms.filter(form => item.quantity <= 6)
   console.log(forms.p)
   
//    forms.forEach(form => {
//         if(item.quantity <= 6){
//         form.style.background = 'red'
//         }   
//     })
}



// button event handler
function buttonEvent(button, item, quantInput, paragraph){
    button.addEventListener('click', e => {
        e.preventDefault()
        paragraph.textContent = "Quantity:  " + (item.quantity -= (quantInput.value *-1))
        console.log(item.quantity)
    quantInput.value = ''
    patchItem(item)
    }
    )
}