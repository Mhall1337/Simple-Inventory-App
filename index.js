
//below we are appending our added items to the page

function appendItem(item){
    let beerDiv = document.createElement('div')
    beerDiv.className = "inventoryDiv"
    beerDiv.id = item.id
    beerDiv.innerHTML = `
        <p>Beer Name: ${item.beerName}</p>
        <div id='quantityDiv'>Quantity: ${item.quantity}</div>
        <form id='beerForm'>
        <input type='number' placeholder = 'Amnt to add or remove' required>
        <input type='submit' value='Add/Remove'>
        </form>
        <div>Style: ${item.style}</div>
        <div>Alocohol%: ${item.alcohol}<div>
        <button class='delete' id='delete'> Delete Item</button>
    `
//Add/Remove button event function
beerDiv.querySelector("#beerForm").addEventListener('submit', e => {
    e.preventDefault()
    const quantityInput = beerDiv.querySelector("#beerForm > input[type=number]")
    beerDiv.querySelector('#quantityDiv').textContent = "Quantity:  " + (item.quantity -= (quantityInput.value *-1))
    patchItem(item)
    quantityInput.value = ''
    }
)

//delete inventory item
beerDiv.querySelector("#delete").addEventListener('click', e =>{
    beerDiv.remove()
    deleteItem(item.id)
})
//append item to page
document.querySelector("body > section").append(beerDiv)
}

// handle adding an item to inventory database with 'click' event
const addBeerToInventory = document.querySelector("#addItem")
addBeerToInventory.addEventListener('submit', (e)=> addToInventory(e))
function addToInventory(e){
    e.preventDefault()
let  newInventoryItem = {
        beerName: document.querySelector("#beerName").value,
        quantity: document.querySelector("#quantity").value,
        style: document.querySelector("#style").value,
        alcohol: document.querySelector("#alcohol").value
     }
     postItem(newInventoryItem)
     addBeerToInventory.reset()
}


//patch a beer


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
  .then(beerObj => appendItem(beerObj))
  }

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
    .then(beer => console.log(beer))
}
