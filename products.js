// filter by name
let filterBtns = document.querySelectorAll(".company-list li");
let products = document.querySelectorAll(".card");

filterBtns.forEach(function(btn){
    let brand = btn.dataset.filter;

    btn.addEventListener("click", function(e){
        products.forEach(function(product){
            let productBrand = product.dataset.company;

            if (brand == "all") {
                product.style.display = "block";
            } else {
                if(productBrand == brand){
                    product.style.display = "block"
                } else {
                    product.style.display = "none";
                }
            }          
        })
    })
})

// filter by price
const searchPrice = document.querySelector(".search-price");
let priceValue = document.querySelector(".price-value span")

searchPrice.addEventListener("input", (e)=>{
    let value = e.target.value;
    priceValue.innerHTML = value;
    
    products.forEach(product => {
        const productPrice =  product.lastElementChild.lastElementChild.lastElementChild.innerHTML;

        if (value == 1000) {
            product.style.display = "block";
        } else {
            if(value >= productPrice){
                product.style.display = "block"
            } else {
                product.style.display = "none";
            }
        }   
    })
})

// search function
let searchScreen = document.querySelector(".search input");
let productNames = document.querySelectorAll(".product-name");

searchScreen.addEventListener("keyup", function(){
    productNames.forEach(function(item){

        let searchValue = searchScreen.value.trim();
        let lenght = searchValue.length;
        let match = item.innerHTML.slice(0, lenght);

        if (searchValue == match) {
            item.parentNode.parentElement.style.display = "block";
        } else{
            item.parentNode.parentElement.style.display = "none"
        }
        
    })
})
