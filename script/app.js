const overflow = document.getElementById('overflow');


// mobile menu

const mobileMenu = document.getElementById('mobMenu');
const closeMenu = document.getElementById('closeMobileMenu');
const openMenu = document.getElementById('openMobileMenu');


openMenu.addEventListener('click', () => {
    mobileMenu.style.display = "flex";  
    overflow.style.display = 'block';
})

closeMenu.addEventListener('click', () => {
    mobileMenu.style.display = "none"; 
    overflow.style.display = 'none'
})


// -----GALLERY-----

const previousBtn = document.getElementById('leftButton');
const nextBtn = document.getElementById('rightButton');
const prodImage = document.getElementById('prodImage');

//mobile gallery
let count = 1;

const next = (imgCont) => {
    if (count === 4) {
        count = 0;
    }
    count++
    imgCont.src = `./images/image-product-${count}.jpg`;

}

const prev = (imgCont) => {
    if (count === 1) {
        count = 5;
    }
    count--;
    imgCont.src = `./images/image-product-${count}.jpg`
   
}

nextBtn.addEventListener('click',()=>  {next(prodImage)});
previousBtn.addEventListener('click',()=> {prev(prodImage)})


// desktop gallery 
const mainImage = document.getElementById("mainImage");
const options = document.querySelectorAll('.option');

options.forEach(option => {
    let currentSource;
  
    option.addEventListener('click', (e) => {
        let mainSource = mainImage.src;
        currentSource = option.src
        option.src = mainSource;
        mainImage.src = currentSource;
})
})

//stand alone Gallery for desktop
const standAlone = document.getElementById('standAlone');
const standAloneClose = document.getElementById('stdCls');


mainImage.addEventListener('click', () => {
    overflow.style.display = 'block'
    standAlone.style.display = 'grid';
})
standAloneClose.addEventListener('click', () => {
    overflow.style.display = 'none';
    standAlone.style.display = 'none';
})


// image navigation for stand alone gallery
const mainImageStandAlone = document.getElementById('standAlonemain')
const stdNext = document.getElementById('stdNext');
const stdPrev = document.getElementById('stdPrev');
stdNext.addEventListener('click',()=>{next(mainImageStandAlone)});
stdPrev.addEventListener('click',()=>{prev(mainImageStandAlone)})


//image selection for stand alone gallery
const standoptions = document.querySelectorAll('.standoption');

standoptions.forEach(option => {
    let currentSource;
  
    option.addEventListener('click', (e) => {
        let mainSource = mainImageStandAlone.src;
        currentSource = option.src
        option.src = mainSource;
        mainImageStandAlone.src = currentSource;
})
})






// -------CART------
const cartBtn = document.getElementById('cart');
const cartSection = document.getElementById('cartSect');
const itemSection = document.getElementById('itemSection');
const checkOutBtn = document.getElementById('checkBtn');
const emptyText = document.getElementById('empty');
const prodCount = document.getElementById('prodCount')

//open cart menu
let cartVisible = false;
cartBtn.addEventListener('click', () => {
    if (cartVisible === false) {
        cartSection.style.display = 'flex';
        cartVisible = true;
    }
    else {
        cartSection.style.display = 'none';
        cartVisible = false;
    }
})

// add products to cart;

// keep count of total products in cart
let products = 0;


// create product cart in cart
const prodCard = (image, prodName, originprice, prodQuantity, prodTotal) => {
    const item = document.createElement('div');
    const imageCont = document.createElement('div');
    const prodImageCart = document.createElement('img');
    const details = document.createElement('div');
    const name = document.createElement('p');
    const priceSection = document.createElement('div');
    const originalPrice = document.createElement('p');
    const operation = document.createElement('span');
    const totalPrice = document.createElement('span');
    const quantity = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const deleteImg = document.createElement('img');

    item.classList.add('item');
    imageCont.classList.add('img');
    details.classList.add('det');
    name.classList.add('name');
    priceSection.classList.add('price');
    originalPrice.classList.add('origin');
    operation.classList.add('operation');
    totalPrice.classList.add('total');
    quantity.classList.add('quant')
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('id', "deleteItem");

    imageCont.appendChild(prodImageCart);
    details.appendChild(name)
    details.appendChild(priceSection);
    priceSection.appendChild(originalPrice);
    priceSection.appendChild(operation);
    priceSection.appendChild(quantity)
    priceSection.appendChild(totalPrice);
    deleteBtn.appendChild(deleteImg)

    item.appendChild(imageCont)
    item.appendChild(details)
    item.appendChild(deleteBtn)
    itemSection.appendChild(item)

    deleteImg.src = './images/icon-delete.svg'
    prodImageCart.src = image;
    name.textContent = prodName;
    originalPrice.textContent = `$ ${originprice}`;
    operation.textContent = 'x';
    quantity.textContent = prodQuantity;
    totalPrice.textContent = `$ ${prodTotal}`;
}

//prod delete button

document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('delete')) return;
    const prodId = e.target.parentElement;
    prodId.remove()

    // everytime user delete item from cart, products will be decremented by one
    products--
        prodCount.textContent = products;
    if (products === 0) {
        checkOutBtn.style.display = 'none';
        emptyText.style.display = 'block';
        prodCount.style.display = 'none'
    }
})

//checkout button
checkOutBtn.addEventListener('click', () => {
    products = 0;
    prodCount.textContent = products;
    checkOutBtn.style.display = 'none';
    emptyText.style.display = 'block';
    prodCount.style.display = 'none';
    cartSection.style.display = 'none';
    cartVisible = false;
    const items = document.querySelectorAll('.item');
    items.forEach((item)=> item.remove())
})






// -------QUANTITY-------

const quantityInput = document.getElementById('quantInput');
const minusBtn = document.getElementById('less');
const plusBtn = document.getElementById('more');

// product quantity functionality
let quantity = 0;

minusBtn.addEventListener('click', () => {
    if (quantity === 0) return;
    quantity--;
    quantityInput.value = quantity;
    if (quantity === 0) {
        buyBtn.disabled = true;
     }
    
});
plusBtn.addEventListener('click', () => {
    quantity++
    quantityInput.value = quantity;
    buyBtn.disabled = false;
})



//-------ADD TO CART BUTTON--------
const buyBtn = document.getElementById('buy');


// buy button functionality
buyBtn.addEventListener('click', () => {
    const image = './images/image-product-1-thumbnail.jpg';
    const prodName = 'Autumn Limited Edition...'
    const originalPrice = 125;
    const quantity = quantityInput.value;
    const total = originalPrice * quantity;

    // everytime user click on add to cart button, product will be incremented to one
    products++;

    prodCard(image, prodName, originalPrice, quantity, total);

    checkOutBtn.style.display = 'block';
    emptyText.style.display = 'none';

    prodCount.style.display = 'block';
    prodCount.textContent = products;
    
})


