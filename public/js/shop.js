if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}



function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var cart =  []
    if ( sessionStorage.getItem('Products') )
    {
        cart = JSON.parse(sessionStorage.getItem('Products'))
        for ( let index in cart )
        {
             if ( cart[index].hasOwnProperty('qty') )
             {
                console.log("The quantity is " + cart[index].qty )
             }
            addItemToCart(cart[index].title,cart[index].price,cart[index].img)
        }
        updateCartTotal()
    }
}


function removeCartItem(event) {
    var buttonClicked = event.target
    var shopItem = buttonClicked.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
    var cart =  []
    if ( sessionStorage.getItem('Products') )
    {
        cart = JSON.parse(sessionStorage.getItem('Products'))
        for ( let index in cart )
        {
            if ( cart[index].title === title )
            {
                 cart.splice(index,1)
            }
        }
        sessionStorage.setItem('Products',JSON.stringify(cart))
    }
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    var shopItem = input.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
    var cart =  []
    if ( sessionStorage.getItem('Products') )
    {
        cart = JSON.parse(sessionStorage.getItem('Products'))
        for ( let index in cart )
        {
            if ( cart[index].title === title )
            {
                 console.log("The input is" + input.value )
                 cart[index].qty = input.value;
            }
        }
        sessionStorage.setItem('Products',JSON.stringify(cart))
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already added to the cart')
            return
        }
    }
    console.log("The product list: " + JSON.stringify(sessionStorage.getItem('Products')))
    console.log("The url is " + imageSrc )

    oldElements = []
    if ( sessionStorage.getItem('Products') )
    {
        oldElements = JSON.parse(sessionStorage.getItem('Products'))
    }
    var qty = 1
    for (var i = 0; i < oldElements.length; i++) {
        if (oldElements[i].title === title)
        {
            if ( oldElements[i].hasOwnProperty('qty') )
            {
                console.log("The quantity is " + oldElements[i].qty);
                qty = oldElements[i].qty;
            }
        }
    }
    console.log("The quantity in the cart" + qty )
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="` + qty + `">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    for (var i = 0; i < oldElements.length; i++) {
        if (oldElements[i].title === title)
        {
            return
        }
    }
    var prod = { 'price':price,'title':title,'img':imageSrc,'qty':qty };
    oldElements.push(prod);
    sessionStorage.setItem('Products',JSON.stringify(oldElements));
    getID(title);
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('GBP', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100
    sessionStorage.setItem("Total",JSON.stringify(total))
    document.getElementsByClassName('cart-total-price')[0].innerText =  total + ' GBP'
}
function getID(name)
{
    oldElements = []
    if ( sessionStorage.getItem('Products') )
    {
        oldElements = JSON.parse(sessionStorage.getItem('Products'))
    }
    var Http = new XMLHttpRequest();
    var url = "http://localhost:3000/shop/getID/"+name;
    Http.open("GET",url);
    Http.send();

    Http.onreadystatechange=function()
    {
        if ( this.readyState === 4 )
        {
              console.log(Http.responseText);
              for (var i = 0; i < oldElements.length; i++) {
                    if (oldElements[i].title === name)
                    {
                        oldElements[i].id = Http.responseText;
                    }
              }
              console.log(JSON.stringify(oldElements));
              sessionStorage.setItem('Products',JSON.stringify(oldElements))
        }
    }
}
