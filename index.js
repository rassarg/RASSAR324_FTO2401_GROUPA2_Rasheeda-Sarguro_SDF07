
// importing  from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// Personal firebase reference link
const appSettings = {
    databaseURL: "https://realtime-database-fd7e9-default-rtdb.europe-west1.firebasedatabase.app/"
    
}
// setup for Firebase:
const app = initializeApp(appSettings)  // This created app object in project. 
const database = getDatabase(app) //getDatabase object that is fed by app object
const shoppingListInDB = ref(database, "shoppingList") // reference (shoppingList) created for firebase 
// Setup for app:
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// Add to cart Button
addButtonEl.addEventListener("click", function() { //eventListener added when button is clicked
    let inputValue = inputFieldEl.value //user-generated text input field of app
    
    push(shoppingListInDB, inputValue) // pushes items from app to firebase database created
    
    clearInputFieldEl() // clears the input field once item is added
})
//  Whenever a change is made in firebase database:
onValue(shoppingListInDB, function(snapshot) { // firebase gets new snapshot when change is made
    if (snapshot.exists()) {                // Boolean created to allow for no items to be added in app
        let itemsArray = Object.entries(snapshot.val()) // Turning object into array. 'entries' grabs both keys & values of items in firebase
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) { // for loop on array
            let currentItem = itemsArray[i]  //
            let currentItemID = currentItem[0]  // This I find confusing
            let currentItemValue = currentItem[1] //
            
            appendItemToShoppingListEl(currentItem) 
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet" // message displays if there are no items added
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

// removing items from firebase database and also app: 
function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li") // created li element in JS
    
    newEl.textContent = itemValue //textContent of li element
    
    newEl.addEventListener("click", function() { // event listener added to remove items 
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`) //locates exact location in database using template literals
        
        remove(exactLocationOfItemInDB) // removes item from exact location in database
    })
    
    shoppingListEl.append(newEl) // appended shoppingListEl to parent element (newEl)
}

// This was a super tough module to get through and I was so confused most of the time
// But having a final app in the end was so cool!
// The only thing they didn't cover was how we can allow individual users to use the app, but not have the input values transfer to all users.