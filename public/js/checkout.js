if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', startShop);
} else {
    startShop();
}

function startShop() {
    var checkOut = document.getElementsByClassName('btn')[0];
    checkOut.addEventListener('click',purchaseClicked);
}

function purchaseClicked() {
    var name = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("adr").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    console.log("We made a purchase!");
    var Http = new XMLHttpRequest();
    var url = "http://localhost:3000/checkout/addCustomer/"+name+"/"+email;
    Http.open("GET",url);
    Http.send();
    var status = "We are not able to process your order at this moment";
    addItems(email);
    Http.onreadystatechange=function()
    {
      console.log(Http.responseText);
      if (this.readyState === 4)
      {
        if (Http.responseText === "OK")
        {
          status = "Thank you for purchasing!";
          if ( sessionStorage.getItem('Products') )
          {
            sessionStorage.removeItem('Products') ;
          }
        }
        alert(status);
      }
    }
}

function addItems(email) {
    cart = JSON.parse(sessionStorage.getItem('Products'));
    console.log("cart");
    for (var item in cart)
    {
      var urlBuilder = "http://localhost:3000/checkout/addItem/" + email + '/';
      urlBuilder = urlBuilder + cart[item].id + '/';
      var unitPrice = Number(cart[item].price);
      var qty = Number(cart[item].qty);
      var totalPrice = unitPrice * qty ;
      urlBuilder = urlBuilder + totalPrice + '/';
      urlBuilder = urlBuilder + qty ;
      var Http = new XMLHttpRequest();
      Http.open("GET",urlBuilder);
      Http.send();
      Http.onreadystatechange=function() {
        if (this.readyState === 4)
        {
          console.log(Http.responseText);
        }
      }
    }
}
