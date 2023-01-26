// toggle menu
let menuBtn = document.querySelector(".menu-btn");
let links = document.querySelector(".nav-links");

menuBtn.addEventListener("click", btn => {
    menuBtn.classList.toggle("menu-active");
    links.classList.toggle("open-nav")
});
// open cart
const openCart = document.querySelector(".cart-container");

openCart.addEventListener("click", function(){
    cartSection.classList.toggle("show-cart")
})
// close cart
const closeBtn = document.querySelector(".close-btn");
let cartSection = document.querySelector('.cart-box');

closeBtn.addEventListener("click", function(){
    cartSection.classList.toggle("show-cart")
})
// add to cart
let cartCount = document.querySelector(".cart-count");
let addBtns = document.querySelectorAll(".add-btn");
const cartContent = document.querySelector(".cart-content");
const msgEmpty = document.querySelector(".empty-cart");
let cartItems = JSON.parse(localStorage.getItem("cart"));


window.addEventListener("DOMContentLoaded", ()=> {
    
    // display products in cart from local storage
    if(localStorage.getItem("cart")) {
        cartItems.forEach(item => {
            showItemsInCart(item.id, item.img ,item.title, item.price, item.amount);
        })
        // disable product's btn if exists in cart
        addBtns.forEach(btn => {
            let productId = btn.parentElement.parentElement.parentElement.parentElement.dataset.id;
            
            for (let i = 0; i < cartItems.length; i++){
                if (productId == cartItems[i].id){
                    btn.textContent = "In Cart";
                    btn.disabled = true;
                }
            }
        })
        // disable empty cart
        if (cartItems.length > 0) {
            msgEmpty.classList.add("hide");
            updateCartCount(cartItems);
        } else if (cartItems.length == 0){
            msgEmpty.classList.remove("hide")
            cartCount.textContent = 0;
        }
    }
})

addBtns.forEach(function(btn){
    btn.addEventListener("click", function(e){
        let count = cartCount.textContent;
        let myBtn = e.target;
        let itemId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let itemImg = e.target.parentElement.parentElement.parentElement.firstElementChild.src;
        let itemTiltle = e.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.textContent;
        let itemPrice = e.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.textContent;
        let itemAmount = 1;

        myBtn.textContent = "In Bag";
        myBtn.disabled = true;
        msgEmpty.classList.add("hide");
        addToLocalStorage(itemId, itemImg ,itemTiltle, itemPrice, itemAmount);
        showItemsInCart(itemId, itemImg ,itemTiltle, itemPrice, itemAmount);
        cartNumberPlus(count);
        showCart();
    })
})

function showItemsInCart (id, img, title, price, amount){
    const element = document.createElement("div");
    element.classList.add("cart-item");
    element.setAttribute("data-id", id);
    element.innerHTML = `
                        <img src="${img}" alt="" class="cart-img">
                        <div>
                            <h4>${title}</h4>
                            <h5>${price}</h5>
                            <span class="remove-item">remove</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-chevron-up count-btn plus" data-id="${id}"></i>
                            <p class="item-amount">${amount}</p>
                            <i class="fa-solid fa-chevron-down count-btn minus" data-id="${id}"></i>
                        </div>`

    const deleteBtn = element.querySelector(".remove-item");

    deleteBtn.addEventListener("click", deleteItem);

    cartContent.appendChild(element)
}

function addToLocalStorage(itemId ,itemImg ,itemTiltle, itemPrice, itemAmount){
    let items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    let products = {id: itemId, img: itemImg, title: itemTiltle, price: itemPrice, amount: itemAmount};

    items.push(products)
    localStorage.setItem("cart", JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[];

    items = items.filter(function(item){
        if (item.id != id){
            return item;
        }
    })
    localStorage.setItem("cart", JSON.stringify(items));
};

function showCart(){
    cartSection.classList.add("show-cart")
}

function cartNumberPlus(count){

    count++
    cartCount.innerHTML = count;
}

function cartNumberMinus(count){
    count--
    cartCount.innerHTML = count;
}

function deleteItem(e){
    let element = e.target.parentElement.parentElement;
    let id = element.dataset.id;

    element.remove();
    removeFromLocalStorage(id);

    let itemsinCart = JSON.parse(localStorage.getItem("cart"))

    newCartCount(itemsinCart)

    addBtns.forEach(btn => {
        let productId = btn.parentElement.parentElement.parentElement.parentElement.dataset.id;

        if(id == productId){
            btn.textContent = "Add to Cart"
            btn.disabled = false;
        }
    })
}

// increase and decrease item's amount
cartContent.addEventListener("click", e => {
    let amountBtn = e.target;
    let id = amountBtn.dataset.id;
    let itemsinCart = JSON.parse(localStorage.getItem("cart"))
    

    if(amountBtn.classList.contains("plus")){
        
        let tempItem = itemsinCart.find(item => item.id == id)

        tempItem.amount = tempItem.amount + 1;
        amountBtn.nextElementSibling.innerText = tempItem.amount;
        editLocalStorage(id, tempItem.amount);
        updateCartCount(itemsinCart);

        
    } else if(amountBtn.classList.contains("minus")){
        
        let tempItem = itemsinCart.find(item => item.id == id)

        tempItem.amount = tempItem.amount - 1;
        amountBtn.previousElementSibling.innerText = tempItem.amount;
        editLocalStorage(id, tempItem.amount);

        if(tempItem.amount == 0){
            deleteItem(e);
        }

        updateCartCount(itemsinCart);
    } 
})

function editLocalStorage(id, tempItem){
    let items = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[];

    items = items.map(function(item) {
        if(item.id === id){
            item.amount = tempItem;
        }
        return item;
    })
    localStorage.setItem("cart", JSON.stringify(items));
};

function updateCartCount (cart){

    let total = cart.map(item => item.amount);

    let finalTotal = total.reduce((acc, curr)=> {
        return acc + curr;
    })
        cartCount.textContent = finalTotal;
}

function newCartCount (cart){
    if (cart.length > 0) {
        msgEmpty.classList.add("hide");
        updateCartCount(cart);
    } else if (cart.length == 0){
        msgEmpty.classList.remove("hide")
        cartCount.textContent = 0;
    }
}
