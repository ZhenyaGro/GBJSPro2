const reviews = JSON.parse(localStorage.getItem('reviews'));
const formEl = document.querySelector('.form');

reviews.forEach(async (review, index) => {
  await new Promise(resolve => {
    formEl.innerHTML += `
    <div class="product-box">
      <div class="product">
        <div class="product__name">
        ${review.product}
        </div>
        <button id="button-show_${index}" class="product__review-button">Показать отзывы</button>
      </div>
      <div id="reviews_${index}" class="product__reviews product__revievs_hide">
      </div>
    </div>
    `;

    resolve();
  });

  const reviewsBlockEl = await new Promise((resolve, reject) => {
    try {
      const reviewsBlockEl = document.querySelector(`#reviews_${index}`);
      reviewsBlockEl.innerHTML += review.review.map((review, reviewIndex) => `<div>${review} <button id="#button-remove_${index}-${reviewIndex}">Удалить отзыв</button></div>`).join('');
      resolve(reviewsBlockEl);
    } catch (error) {
      reject(error);
    }
  });

  document.querySelector(`#button-show_${index}`).addEventListener('click', () => toggleReviewsVisibility(reviewsBlockEl));
});

function toggleReviewsVisibility(reviewsBlock) {
  reviewsBlock.classList.toggle('product__revievs_hide');
}