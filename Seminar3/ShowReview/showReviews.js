const reviews = JSON.parse(localStorage.getItem('reviews'));
const formEl = document.querySelector('.form');

for (let product in reviews) {
  createProductBlock(product);
}

async function createProductBlock(product) {
  const productId = await new Promise(resolve => {
    const productId = product.replaceAll(' ', '-');
    formEl.innerHTML += `
    <div id="product_${productId}" class="product-box">
      <div class="product">
        <div class="product__name">
        ${product}
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

      for (let id in reviews[product]) {
        reviewsBlockEl.innerHTML += `<div id="review_${id}">${reviews[product][id]} <button id="button-remove_${id}" onClick="removeReview('${id}', '${product}')">Удалить отзыв</button></div>`;
      }
      // reviewsBlockEl.innerHTML += reviews[product].map(review => `<div id="review_${review.id}">${review.text} <button id="button-remove_${review.id}" onClick="removeReview('${review.id}', '${product}')">Удалить отзыв</button></div>`).join('');
      resolve(reviewsBlockEl);
    } catch (error) {
      reject(error);
    }
  });

  const showButtonEl = document.querySelector(`#button-show_${productId}`);
  showButtonEl.addEventListener('click', () => {
    toggleReviewsVisibility(reviewsBlockEl, showButtonEl);
  });
}

async function toggleReviewsVisibility(reviewsBlock, buttonEl) {
  buttonEl.innerHTML = await new Promise(resolve => {
    resolve(reviewsBlock.classList.toggle('product__revievs_hide') ? 'Показать отзывы' : 'Скрыть отзывы');
  });
}

function removeReview(id, product) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  delete reviews[product][id];

  if (!Object.keys(reviews[product]).length) {
    delete reviews[product];
    removeNodes(`product_${product.replaceAll(' ', '-')}`);
  } else document.querySelector(`#review_${id}`).remove();

  localStorage.setItem('reviews', JSON.stringify(reviews));
}


function removeNodes(id) {
  const element = document.getElementById(id);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.remove();
}
