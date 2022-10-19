import { refs } from './js/refs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import Debounce from 'lodash.debounce';

import { PixabayAPI } from './js/PixabayAPI';

const DEBOUNCE_DELAY = 300;

const pixabay = new PixabayAPI();

refs.input.addEventListener('input', Debounce(onInput, DEBOUNCE_DELAY));
refs.loadMoreBtn.addEventListener('click', loadMore);

async function onInput(event) {
  pixabay.itemToFind = event.target.value.trim().toLowerCase();
  if (!pixabay.itemToFind) {
    clearPage();
    return;
  }
  pixabay.resetCurrPage();

  const serverData = await pixabay.getImages();
  if (pixabay.totalItems === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${pixabay.totalItems} images !`);

  clearPage();

  insertMarkup(serverData);

  if (pixabay.canLoadMore) {
    console.log(pixabay.canLoadMore);
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function clearPage() {
  refs.galleryBlock.innerHTML = '';
}

async function loadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');

  pixabay.increaseCurrPage();

  const serverData = await pixabay.getImages();

  insertMarkup(serverData);

  if (pixabay.canLoadMore) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function insertMarkup(picturesArray) {
  const galleryMarkup = picturesArray.hits
    .map(({ webformatURL, largeImageURL, tags, views, downloads, likes, comments }) => {
      return `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" class="photo-img" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b>${likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b>${views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b>${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>${downloads}
                  </p>
                </div>
              </div>`;
    })
    .join('');

  refs.galleryBlock.insertAdjacentHTML('beforeend', galleryMarkup);
}
