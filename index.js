console.log('hello')

function postItem(){
    fetch("http://localhost:3000/beerInv")
    .then((resp) => resp.json())
    .then((beerObj) => console.log(beerObj))
}
postItem()