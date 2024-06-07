"use strict";

// http://localhost:8081/api/
const apiBaseUrl = "http://localhost:8081/api/";
const selectEl = document.querySelector("#categoriesDropdown");
const dropDownsDiv = document.querySelector("#dropDowns");
const catDiv = document.querySelector("#catDiv");
const allProductsD = document.querySelector("#allProducts");


window.onload = init();

//adding a listener if event changes
function init() {
  selectEl.addEventListener("change", (event) => {

    //if selectEl.value = categories, disply categories;
    if (selectEl.value === "categories") {
      displayCategories(event);
    //   catDiv.style.display = "block";



      //running to remove dropdown from users view
    } else if (selectEl.value === "products") {
      remove();
        // the next thing we want to do is run the function
        //to display all products in the database

        displayProducts(event)

      //else if selectEl.value = View-All, display all
    } else if (selectEl.value === "Select one") {
      remove();
    }
  });
}

// action: we are going to display categories
function displayCategories(event) {
  event.preventDefault();

  let actualUrl = apiBaseUrl + selectEl.value;

  console.log("URL:" + actualUrl);

  // we are sending a get request to  http://localhost:8081/api/categories
  fetch(actualUrl)
    .then((response) => response.json())
    .then((allCategories) => { //allCategories in an array of category objects
      console.log(allCategories);

      //calling our helper method below
      //that creates a sub dropdown menu that displays
      //the name of each category
      createCategoriesDropDown(allCategories);
    });
}

//helper methd for displaying new drop down menu for categories
function createCategoriesDropDown(dataArr) {
  //note our data is gong to be the arrau we revieve from
  //our api call to  let actualUrl = apiBaseUrl + selectEl.value; aka http://localhost:8081/api/categories

  let newDropDown = document.createElement("select");
  newDropDown.id = "newpage";

  dataArr.forEach((element) => {
    let optionEl = document.createElement("option");
    optionEl.value = element.name;
    optionEl.innerHTML = element.name;
    newDropDown.appendChild(optionEl);
  });

  catDiv.appendChild(newDropDown);
}

//the remove method that basically helps to refresh the users view
//removes the new drop down menu so that there are not multiple drop downs
function remove() {
  const newpage = document.querySelector("#newpage");
  catDiv.removeChild(newpage);
}


//display all of the products in the database
function displayProducts(event) {
    event.preventDefault();
  
    let actualUrl = apiBaseUrl + selectEl.value;
  
    console.log("URL:" + actualUrl);
  
    // we are sending a get request to  http://localhost:8081/api/products
    fetch(actualUrl)
      .then((response) => response.json())
      .then((allProducts) => { //allCategories in an array of category objects
        console.log(allProducts);
  
        let allProductsDiv = document.createElement("div");

        allProducts.forEach((product) => {

            let productDiv = document.createElement("div");
            let productName = document.createElement("h1");
            let productId = document.createElement("p");

            productName.innerHTML = product.productName; //what should the product name be assigned too
            productId.innerHTML = product.productId; // what about the id?

            //we should now add the child elements ( our h1 and p elements to our productDiv)

            productDiv.appendChild(productName); // h1 element
            productDiv.appendChild(productId);

            // after we add both child elements to the productDiv
            // we need to add the product div too the allProductsDiv

            allProductsDiv.appendChild(productDiv);
            allProductsD.appendChild(allProductsDiv);

        })
        
       
      });
  }