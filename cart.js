

// Define product data
var productData = [  {    image_url: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11535230-2295043599450781.jpg",    name: "Christophe Robin Delicate Volumising Conditioner with Rose Extracts 200ml",    box: "25% off with code LUCKY",    price: "39.00",  },  {    image_url: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11732894-2094931106360459.jpg",    name: "Daniel Sandler Watercolour Liquid Cheek Colour 15ml (Various Shades)",    box: "30% off with code DANIEL",    price: "25.00",  },  {    image_url: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/13971627-1124998491824470.jpg",    name: "Deck Of Scarlet Big Lash Energy - Long & Strong Mascara",    box: "20% off with code SCAR",    price: "28.00",  },  {    image_url: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/13507087-5975032476504174.jpg",    name: "Wander Beauty Unlashed Volume and Curl Mascara - Tarmac 9g",    box: "15% off with code WANDE",    price: "27.00",  },];

// Retrieve cart data from localStorage, if it exists
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Add event listener to all Add to Cart buttons
let addToCartButtons = document.querySelectorAll(".add-to-cart");
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    let productId = this.getAttribute("data-id");
    let product = productData[productId];
    if (cart[productId]) {
      cart[productId].quantity++;
    } else {
      cart[productId] = {
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1,
      };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });
}

// Render the contents of the cart
function renderCart() {
  let cartItems = document.querySelector("#cart-items");
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let cartTotal = 0;
  for (let productId in cart) {
    let product = cart[productId];
    let itemTotal = product.price * product.quantity;
    cartTotal += itemTotal;
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${productData[productId].image_url}" alt="${product.name}" width="50px"></td>
      <td>${product.name}<br><small>${productData[productId].box}</small></td>
      <td>$${product.price}</td>
      <td>
        <button class="decrease-quantity" data-id="${productId}">-</button>
        <span>${product.quantity}</span>
        <button class="increase-quantity" data-id="${productId}">+</button>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button class="remove-item" data-id="${productId}">Remove</button></td>
    `;
    cartItems.appendChild(tr);
  }

  // Render cart total


let cartTotalElement = document.querySelector("#cart-total");
cartTotalElement.textContent = `$${cartTotal}`;

// // let cartTotalElement1 = document.querySelector("#cart-price");
// // cartTotalElement1.textContent = `$${cartTotal}`;

// let cartCountElement = document.querySelector('#cart-count');
// 	let cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
// 	cartCountElement.textContent = cartCount;


// Add event listener to all Decrease Quantity buttons
let decreaseQuantityButtons = document.querySelectorAll(".decrease-quantity");
for (let i = 0; i < decreaseQuantityButtons.length; i++) {
decreaseQuantityButtons[i].addEventListener("click", function () {
let productId = this.getAttribute("data-id");
let product = cart[productId];
if (product.quantity > 1) {
product.quantity--;
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
}
});
decreaseQuantityButtons[i].style.opacity = "0.6";
decreaseQuantityButtons[i].style.width = "25px";
decreaseQuantityButtons[i].style.height = "25px";
decreaseQuantityButtons[i].style.padding = "0";
decreaseQuantityButtons[i].style.border = "none";
decreaseQuantityButtons[i].style.fontSize = "20px";

}

// Add event listener to all Increase Quantity buttons
let increaseQuantityButtons = document.querySelectorAll(".increase-quantity");
for (let i = 0; i < increaseQuantityButtons.length; i++) {
increaseQuantityButtons[i].addEventListener("click", function () {
let productId = this.getAttribute("data-id");
let product = cart[productId];
product.quantity++;
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
});
increaseQuantityButtons[i].style.opacity = "0.6";
increaseQuantityButtons[i].style.width = "25px";
increaseQuantityButtons[i].style.height = "25px";
increaseQuantityButtons[i].style.padding = "0";
increaseQuantityButtons[i].style.border = "none";
increaseQuantityButtons[i].style.fontSize = "20px";
}


// Add event listener to all Remove Item buttons
let removeItemButtons = document.querySelectorAll(".remove-item");
for (let i = 0; i < removeItemButtons.length; i++) {
removeItemButtons[i].innerHTML = '&#10006;';
removeItemButtons[i].classList.add('circle-bg');
removeItemButtons[i].addEventListener("click", function () {
let productId = this.getAttribute("data-id");
delete cart[productId];
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
});
}

// Render number of items in cart
let cartItemCount = document.querySelector("#cart-item-count");
let itemCount = Object.keys(cart).length;
cartItemCount.innerHTML = itemCount;

// Toggle visibility of cart based on number of items
let cartContainer = document.querySelector("#cart-container");
if (itemCount > 0) {
cartContainer.classList.remove("hidden");
} else {
cartContainer.classList.add("hidden");
}
}

// Call renderCart() initially to load any existing cart data from localStorage
renderCart();       