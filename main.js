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

addBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e){
        cartCount.innerHTML++
    })
})
