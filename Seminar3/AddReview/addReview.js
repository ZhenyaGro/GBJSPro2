'use strict';

const elClassNames = ['review__input', 'review__textarea', 'review__button-add'];

const inputEl = document.querySelector('.review__input');
const textareaEl = document.querySelector('.review__textarea');
const buttonAddEl = document.querySelector('.review__button-add');

buttonAddEl.addEventListener('click', () => {
  if (!inputEl.value || !textareaEl.value) return alert('Должны быть заполнены оба поля для добавления отзыва');

  const productName = inputEl.value.trim();
  const review = textareaEl.value.trim();

  saveReviewToLocalStorage(productName, review);

  inputEl.value = '';
  textareaEl.value = '';
  setTimeout(function () {
    alert('Отзыв добавлен');
  }, 0);
});

document.querySelector('.review__button-fast-fill').addEventListener('click', () => {
  const initialData = {
    'Apple iPhone 13': {
      '1': 'Отличный телефон! Батарея держится долго.',
      '2': 'Камера супер, фото выглядят просто потрясающе.'
    },
    'Samsung Galaxy Z Fold 3': {
      '3': 'Интересный дизайн, но дорогой.'
    },
    'Sony PlayStation 5': {
      '4': 'Люблю играть на PS5, графика на высоте.'
    }
  }
  try {
    localStorage.setItem('reviews', JSON.stringify(initialData));
    alert('LocalStorage заполнен, можно посмотреть отзывы на странице просмотра');
  } catch (e) {
    alert('Не удалось заполнить LocalStorage, проверьте сообщение в консоли');
    console.log(e.message);
  }
})

function saveReviewToLocalStorage(product, review) {
  let products = JSON.parse(localStorage.getItem('reviews')) || {};

  if (!products.hasOwnProperty(product))
    products[product] = {};

  products[product][Date.now()] = review;

  localStorage.setItem('reviews', JSON.stringify(products));
}