"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное id, для упрощения, используем `Date.now()`.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: Date.now(),
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: Date.now(),
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: Date.now(),
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: Date.now(),
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const reviewsMap = new Map();
initialData.forEach(item => reviewsMap.set(item.product, item.reviews));

const iphoneEl = document.querySelector('#iphone');
const galaxyEl = document.querySelector('#galaxy');
const playstationEl = document.querySelector('#playstation');

// Создание объекта для удобства
const itemsElements = [
  {
    name: 'iphone',
    product: 'Apple iPhone 13',
    reviewsEl: iphoneEl.querySelector('#iphone .item__reviews'),
    buttonEl: iphoneEl.querySelector('#iphone button'),
    inputEl: iphoneEl.querySelector('#iphone .item__input')
  },
  {
    name: 'galaxy',
    product: 'Samsung Galaxy Z Fold 3',
    reviewsEl: galaxyEl.querySelector('#galaxy .item__reviews'),
    buttonEl: galaxyEl.querySelector('#galaxy button'),
    inputEl: galaxyEl.querySelector('#galaxy .item__input')
  },
  {
    name: 'playstation',
    product: 'Sony PlayStation 5',
    reviewsEl: playstationEl.querySelector('#playstation .item__reviews'),
    buttonEl: playstationEl.querySelector('#playstation button'),
    inputEl: playstationEl.querySelector('#playstation .item__input')
  }];

initialFill();

itemsElements.forEach(item => item.buttonEl.addEventListener('click', () => {
  const value = item.inputEl.value;
  if (checkInputValue(value)) {
    reviewsMap.get(item.product).push({ id: Date.now(), text: value })
    item.reviewsEl.innerHTML += `<div>${value}</div>`;
    item.inputEl.value = '';
  }
  else alert('Отзыв должен быть не менее 50 и не более 500 символов');
}));

/**
 * Функция начального заполнения отзывов из initialData
 */
function initialFill() {
  initialData.forEach(item => {
    for (let shopItem of itemsElements) {
      if (item.product.toLocaleLowerCase().includes(shopItem.name)) {
        item.reviews.forEach(review => shopItem.reviewsEl.innerHTML += `<div>${review.text}</div>`);
      }
    }
  });
}

/**
 * Функция проверки корректности длины введенного отзыва
 * @param {string} value 
 * @returns boolean | undefined
 */
function checkInputValue(value) {
  if (value.length > 4 && value.length < 501) return true;
}