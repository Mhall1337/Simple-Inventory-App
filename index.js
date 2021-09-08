
//patch a beer
function patchItem(obj){
    fetch(`http://localhost:3000/beerInv/${obj.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
     })
    .then(res => res.json())
  //.then(beerObj => console.log(beerObj))
  }

//post a beer
function postItem(obj){
    fetch('http://localhost:3000/beerInv',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
  })
  .then(res => res.json())
  //.then(beerObj => console.log(beerObj))
  }

//fetch a beer
function fetchItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => beerObj.forEach(item => appendItem(item)))
}
fetchItem()

//deletes item from DB
function deleteItem(id){
    fetch(`http://localhost:3000/beerInv/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    //.then(beer => console.log(beer))
}

//below we are appending our added items to the page
function appendItem(item){
    let inventoryDiv = document.createElement('div')
    inventoryDiv.className = 'inventoryDiv'
    inventoryDiv.textContent = "Beer Name:  " + item.beerName
    document.querySelector("body > section").append(inventoryDiv)

//<div> containing <button>, <input>, and quantity <p>
    const quantDiv = document.createElement('div')
    inventoryDiv.append(quantDiv)

//add <p> for text content to get out of string??
    let paragraph = document.createElement('p')
    paragraph.textContent = "Quantity:  " + item.quantity
    quantDiv.append(paragraph)
    
//add input <div>
    let quantInput = document.createElement('input')
    quantInput.id = item.id
    quantInput.class = 'quantityInput'
    quantInput.placeholder = 'Amnt to Add or Remove'
    quantInput.type = 'number'
   
 //create and append the button   
    let button = document.createElement('button')
    button.textContent = 'Add/Remove'
    button.id = item.id
    quantDiv.append(quantInput)
    quantDiv.append(button)

//create style <div>
    let styleDiv = document.createElement('div')
    styleDiv.textContent = "Style:  " + item.style
    inventoryDiv.append(styleDiv)

//create Alpha Acid <div>
    let alcoholPercent = document.createElement('div')
    alcoholPercent.textContent = "Alcohol %:  " + item.alcohol
    inventoryDiv.append(alcoholPercent)  

//create deleteBeer button
    const deleteBeer = document.createElement('button')
    inventoryDiv.append(deleteBeer)
    deleteBeer.textContent = 'Delete From Inventory'
    
//deletes the beer from our page    
    deleteButton(deleteBeer, item)

//button event listener with PATCH
    addRemoveButton(button, item, quantInput, paragraph)  
}

// handle adding an item to inventory database with 'click' event
document.querySelector("#addItem > input[type=Submit]").addEventListener('click', e => addToInventory(e))
function addToInventory(){
let  newInventoryItem = {
        beerName: document.querySelector("#beerName").value,
        quantity: document.querySelector("#quantity").value,
        style: document.querySelector("#style").value,
        alcohol: document.querySelector("#alcohol").value
     }
     appendItem(newInventoryItem)
     postItem(newInventoryItem)
     //clear input fields
      document.querySelector("#beerName").value =''
      document.querySelector("#quantity").value =''
      document.querySelector("#style").value =''
      document.querySelector("#alcohol").value ='' 
}

// Add/Remove button event function
function addRemoveButton(button, item, quantInput, paragraph){
    button.addEventListener('click', e => {
        e.preventDefault()
        paragraph.textContent = "Quantity:  " + (item.quantity -= (quantInput.value *-1))
    quantInput.value = ''
    patchItem(item)
    })
}

//delete from inventory button
function deleteButton(deleteBeer, item){
    deleteBeer.addEventListener('click', e =>{
        e.preventDefault()
        deleteBeer.parentElement.remove()
        deleteItem(item.id)
    })
}