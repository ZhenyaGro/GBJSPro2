const reviews = JSON.parse(localStorage.getItem('reviews'));
const formEl = document.querySelector('.form');

reviews.forEach(async review => {
  const productId = await new Promise(resolve => {
    const productId = review.product.replaceAll(' ', '-');
    formEl.innerHTML += `
    <div class="product-box">
      <div class="product">
        <div class="product__name">
        ${review.product}
        </div>
        <button id="button-show_${productId}" class="product__review-button">Показать отзывы</button>
      </div>
      <div id="reviews_${productId}" class="product__reviews product__revievs_hide">
      </div>
    </div>
    `;

    resolve(productId);
  });

  const reviewsBlockEl = await new Promise((resolve, reject) => {
    try {
      const reviewsBlockEl = document.querySelector(`#reviews_${productId}`);
      reviewsBlockEl.innerHTML += review.review.map(review => `<div id="review_${review.id}">${review.text} <button id="button-remove_${review.id}" onClick="removeReview('${review.id}', ${review.product})">Удалить отзыв</button></div>`).join('');
      resolve(reviewsBlockEl);
    } catch (error) {
      reject(error);
    }
  });

  const showButtonEl = document.querySelector(`#button-show_${productId}`);
  showButtonEl.addEventListener('click', () => {
    toggleReviewsVisibility(reviewsBlockEl, showButtonEl);
  });
});

async function toggleReviewsVisibility(reviewsBlock, buttonEl) {
  buttonEl.innerHTML = await new Promise(resolve => {
    resolve(reviewsBlock.classList.toggle('product__revievs_hide') ? 'Показать отзывы' : 'Скрыть отзывы');
  });
}

function removeReview(reviewId, productName) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  console.log(reviews);
  document.querySelector(`#review_${reviewId}`).remove();
}