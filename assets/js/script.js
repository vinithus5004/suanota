const mainContent = document.querySelector('.main-content');
const span = document.querySelector('.button.cart > span');

let productsOnCart = [];

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
                            productsOnCart.push(product);
                            span.innerText = productsOnCart.length;
                        }else{
                            productButton.classList.remove('item-on-cart');
                            productButton.innerText = 'Adicionar ao Carrinho';
                            removeItemOnCart(product.id);
                            span.innerText = productsOnCart.length;
                        }
                        console.log(productsOnCart);
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

openModal.addEventListener('click', () => {
    productsCount.innerText = `${productsOnCart.length} ${productsOnCart.length === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho`;
    modalContainer.classList.add('active');
});

closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('active');
})