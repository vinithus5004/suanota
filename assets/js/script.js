const mainContent = document.querySelector('.main-content');
const span = document.querySelector('.button.cart > span');

let productsOnCart = [];
let qtElements = []

function toBRL(amout){
    return amout.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
}

function renderProducts(){
    let htmlContent = '';

    products.map(product => (
        htmlContent += `
        <div class="product-item">
            <div class="product-img"><img src="assets/images/products/${product.image}" alt="${product.name}"></div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${toBRL(product.price)}</div>
            <button onClick="onCartToggle(${product.id})" data-button="${product.id}" class="button">Adicionar ao carrinho</button>
        </div>`
    ));

    mainContent.innerHTML = htmlContent;
}

function removeItemOnCart(id){
    let newArray = productsOnCart.filter(productOnCart => productOnCart.id !== id);
    productsOnCart = newArray;
}

function onCartToggle(id){
    if(products.length > 0){
        products.forEach(product => {
            if(product.id === id){
                product.onCart = !product.onCart;
                productButtons.forEach(productButton => {
                    if(parseInt(productButton.getAttribute('data-button')) === id){
                        if(product.onCart){
                            productButton.classList.add('item-on-cart');
                            productButton.innerText = 'Adicionado ao Carrinho';
                            productsOnCart.push({...product, qtOnCart: 1});
                            span.innerText = productsOnCart.length;
                            renderProductsOnCart();
                        }else{
                            productButton.classList.remove('item-on-cart');
                            productButton.innerText = 'Adicionar ao Carrinho';
                            removeItemOnCart(product.id);
                            span.innerText = productsOnCart.length;
                            renderProductsOnCart();
                        }
                    }
                });
            }
        });
    }
}

renderProducts();
const productButtons = document.querySelectorAll('.main-content .button');

/* ---------- modal ---------- */
const modalContainer = document.querySelector('.modal-container');
const openModal = document.querySelector('.button.cart');
const closeModal = document.querySelector('.modal-header .close-modal');
const productsCount = document.querySelector('.modal-header span');
const productsElement = document.querySelector('.modal .products');

openModal.addEventListener('click', () => {
    productsCount.innerText = `${productsOnCart.length} ${productsOnCart.length === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho`;
    modalContainer.classList.add('active');
});

closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('active');
})

function renderProductsOnCart(){
    let htmlContent = '';

    productsOnCart.map(product => (
        htmlContent += `
        <div class="product-item">
            <div class="product-img"><img src="assets/images/products/${product.image}" alt=""></div>
            <div class="item-info-container">
                <div class="item-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${toBRL(product.price)}</div>
                    <div class="product-count">
                        <span data-content="${product.id}">Quantidade: ${product.qtOnCart}x</span>
                        <i class="fa-solid fa-plus" onClick="increase(${product.id})"></i>
                        <i class="fa-solid fa-minus" onClick="decrease(${product.id})"></i>
                    </div>
                </div>
                <button class="button">Comprar</button>
            </div>
        </div>`
    ));

    productsElement.innerHTML = htmlContent;
    qtElements = document.querySelectorAll('.modal .products span');
}

function increase(id){
    productsOnCart.forEach(product => {
        if(product.id === id){
            product.qtOnCart++;
            qtElements.forEach(qtElement => {
                if(parseInt(qtElement.getAttribute('data-content')) === id) qtElement.innerText = `Quantidade: ${product.qtOnCart}x`;
            });
        }
    });
}
function decrease(id){
    productsOnCart.forEach(product => {
        if(product.id === id){
            if(product.qtOnCart > 0){
                product.qtOnCart--;
                qtElements.forEach(qtElement => {
                    if(parseInt(qtElement.getAttribute('data-content')) === id) qtElement.innerText = `Quantidade: ${product.qtOnCart}x`;
                });
            }
            if(product.qtOnCart === 0){
                onCartToggle(product.id);
                productsCount.innerText = `${productsOnCart.length} ${productsOnCart.length === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho`;
            }
        }
    });
}