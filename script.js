let cart = document.querySelector(".cart");
let total = 0;

function openCart(){
    cart.classList.add("active");
}

function closedCart(){
    cart.classList.remove("active");
}

function removeCart(event){
    var buttonClicked = event.target;
    var buttonClick = buttonClicked.parentElement;
    buttonClick.parentElement.remove();
}
var totalPrice = document.getElementById("total-price");
function CalculateTotal(price, quantity){
    total = total + (price * quantity);
    console.log(total);
    totalPrice.innerText = "₹ " + total;
}

function reduceAmount(price, quantity){
    total = total - (price * quantity);
    totalPrice.innerText = "₹ " + total;
}

function buyNow(){
    alert("Your order is placed!");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    totalPrice.innerText = "₹" + 0;
    total = 0;
}

function addCart(event){
    cart.classList.add("active");
    var button = event.target;
    var priceProducts = button.parentElement;
    var shopProducts = priceProducts.parentElement;
    var imageProducts = shopProducts.parentElement;
    var productTitle = shopProducts.getElementsByClassName("card-title")[0].innerText;
    var productPrice = shopProducts.getElementsByClassName("card-text")[0].innerText;
    var productImage = imageProducts.getElementsByClassName("product-img")[0].src;
    var cartContent = document.createElement("div");
    cartContent.classList.add("cart-box");

    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = document.getElementsByClassName("cart-product-title");
    
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == productTitle){
            alert('Product already added to the Cart');
            return;
        }
    }

    var sourceImage = document.createElement("img");
    sourceImage.classList.add("cart-img");
    sourceImage.src = productImage;
    cartContent.appendChild(sourceImage);

    var cartDetail = document.createElement("div");
    cartDetail.classList.add("detail-box");

    var cartProductTitle = document.createElement("div");
    cartProductTitle.classList.add("cart-product-title");
    cartProductTitle.innerText = productTitle;
    cartDetail.appendChild(cartProductTitle);

    var cartProductPrice = document.createElement("div");
    cartProductPrice.classList.add("cart-price");
    cartProductPrice.innerText = productPrice;
    cartDetail.appendChild(cartProductPrice);

    var price = productPrice.replace("₹ ", "");

    var cartInput = document.createElement("input");
    cartInput.classList.add("cart-quantity");
    cartInput.type = 'number';
    cartInput.value = "1";
    cartInput.min = 1;
    CalculateTotal(price, 1);
    cartDetail.append(cartInput);
    var quantity = 1;
    cartInput.addEventListener("change", () =>{
        if(quantity<cartInput.value){
            CalculateTotal(price, (cartInput.value - quantity));
        }
        else{
            reduceAmount(price, (quantity - cartInput.value));
        }
        quantity=cartInput.value;
    });

    var cartRemove = document.createElement("i");
    cartRemove.classList.add("bx", "bx-trash-alt", "cart-remove");
    cartRemove.onclick = removeCart;
    cartDetail.appendChild(cartRemove);

    cartContent.appendChild(cartDetail);
    cartItems.append(cartContent);

}
