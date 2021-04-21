let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Tie Dye Bikini",
        tag: "bikini_dye",
        price: 25,
        inCart: 0
    },
    {
        name: "Bikini de colores",
        tag: "bikini_lines",
        price: 20,
        inCart: 0
    },
    {
        name: "Bikini negro",
        tag: "bikini_black",
        price: 15,
        inCart: 0
    },
    {
        name: "Bikini con shorts",
        tag: "bikini_shorts",
        price: 30,
        inCart: 0
    },
    {
        name: "Traje de baño entero negro",
        tag: "entero_negro",
        price: 25,
        inCart: 0
    },
    {
        name: "Bikini Top",
        tag: "top",
        price: 12,
        inCart: 0
    },
    {
        name: "Bikini Menta",
        tag: "menta",
        price: 15,
        inCart: 0
    },
    {
        name: "Snake Print Bikini",
        tag: "snake_black",
        price: 30,
        inCart: 0
    },
    {
        name: "Bikini amarillo",
        tag: "amarillo",
        price: 12,
        inCart: 0
    },
    {
        name: "Bikini sport",
        tag: "doscolores",
        price: 20,
        inCart: 0
    },
    {
        name: "Bikini tie dye azul",
        tag: "azul_tiedye",
        price: 15,
        inCart: 0
    },
    {
        name: "Snake Print Bikini",
        tag: "snake",
        price: 25,
        inCart: 0
    },
    {
        name: "Manta Rosada",
        tag: "manta",
        price: 25,
        inCart: 0
    },
    {
        name: "Manta Azul",
        tag: "manta_azul",
        price: 20,
        inCart: 0
    },
    {
        name: "Kimono",
        tag: "kimono",
        price: 15,
        inCart: 0
    },
    {
        name: "Kimono",
        tag: "falda",
        price: 25,
        inCart: 0
    }

];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}




function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);

        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);

    } else {
        localStorage.setItem("cartNumbers", 1);

    }
    setItems(product);
}


function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, _index) => {
            productContainer.innerHTML +=
                `<div class="product"><i class="fa fa-dot-circle-o" aria-hidden="true"></i><img src="/static/images/${item.tag}.png" />
                    <span class="sm-hide">${item.name}</span>
                </div>
                <div class="price sm-hide">$${item.price}.00</div>
                <div class="quantity">
                    <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                        <span>${item.inCart}</span>
                    <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">$${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">Total a pagar: </h4>
                    <h4 class="basketTotal">$${cart}.00</h4>
                </div>`
    }
    console.log(cart);
}


function clearAll() {
    localStorage.clear();
    location.reload();
    displayCart();
}

displayCart();