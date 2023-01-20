// filter
let companies = document.querySelectorAll(".company-list li");
let products = document.querySelectorAll(".card");

companies.forEach(function(company){
    let brand = company.dataset.filter;

    company.addEventListener("click", function(e){
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