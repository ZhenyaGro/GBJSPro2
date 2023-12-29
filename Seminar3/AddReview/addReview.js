'use strict';

const elClassNames = ['review__input', 'review__textarea', 'review__button-add'];

const inputEl = document.querySelector('.review__input');
const textareaEl = document.querySelector('.review__textarea');
const buttonAddEl = document.querySelector('.review__button-add');

buttonAddEl.addEventListener('click', () => {
  if (!inputEl.value || !textareaEl.value) return alert('Должны быть заполнены оба поля для добавления отзыва');

  const productName = inputEl.value.trim();
  const reviewText = textareaEl.value.trim();

  saveReviewToLocalStorage(productName, reviewText);

  inputEl.value = '';
  textareaEl.value = '';
  setTimeout(function () {
    alert('Отзыв добавлен');
  }, 0);
});


function saveReviewToLocalStorage(product, review) {
  let products = JSON.parse(localStorage.getItem('reviews')) || [];

  const existingProduct = products.find(item => item.product == product);
  if (existingProduct) existingProduct.review.push(review);
  else
    products.push({ product: product, review: [review] });

  localStorage.setItem('reviews', JSON.stringify(products));
}