'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});

//картинка с товаром
let addToCartArea = document.querySelectorAll('.featuredImgWrap');
//значок корзины
let cartIcon = document.querySelector('.cartIconWrap');
//блок с содержимым корзины
let cart = document.querySelector('.cartWithProduct');
//элемент корзины, в котором отображаются товары
let cartProd = document.getElementById('cartProd');
//получение элемента с общей стоимjстью корзины
let totalCost = document.getElementById('totalCost');
//получение элемента с количеством товара в корзине
let numberProducts = document.getElementById('numberOfProducts');

//добавление алгоритма, который будет выполнятся при нажатии на товар
addToCartArea.forEach(function (el) {
    el.addEventListener('click', function (event) {
        //Название текущего товара
        let prodName = event.target.parentNode.parentNode.querySelector('.featuredName').innerText;
        //Цена текущего выбранного товара
        let prodCost = parseFloat(event.target.parentNode.parentNode.querySelector('.featuredPrice').innerText.slice(1));

        let existsProdInCart = false;
        let exProd = false;

        cartProd.querySelectorAll('#name').forEach(function (ell) {
            if (ell.innerText == prodName) {
                existsProdInCart = true;
                exProd = ell.parentNode;
            };
        });

        if (exProd) {
            let elementQuantity = exProd.querySelector('#quantity');
            let elementAllQuantity = exProd.querySelector('#totalCost');
            elementQuantity.innerText = Number(elementQuantity.innerText) + 1;
            elementAllQuantity.innerText = (parseFloat(elementAllQuantity.innerText) + prodCost).toFixed(2);
            totalCost.innerText = (parseFloat(totalCost.innerText) + prodCost).toFixed(2);
            numberProducts.innerText = Number(numberProducts.innerText) + 1;
        };

        if (!existsProdInCart) {
            cartProd.insertAdjacentHTML("beforeend", `<div class='cartHeaderBox'>
            <div id='name' class="cartHeader cartHeaderName">${prodName}</div>
            <div id='quantity' class="cartHeader cartHeaderQuantity">${1}</div>
            <div id='costPerUnit' class="cartHeader cartHeaderCost">${prodCost.toFixed(2)}</div>
            <div id='totalCost' class="cartHeader cartHeaderAllCost">${prodCost.toFixed(2)}</div>
            </div>`);
            totalCost.innerText = (parseFloat(totalCost.innerText) + prodCost).toFixed(2);
            numberProducts.innerText = Number(numberProducts.innerText) + 1;
        };
    });
});

//Показ корзины при клике
cartIcon.addEventListener('click', function (event) {
    cart.classList.toggle('hidden');
});