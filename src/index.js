import refs from './js/refs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import Debounce from 'lodash.debounce';
import axios from 'axios';

import { refs } from './js/refs';

const DEBOUNCE_DELAY = 300;
const AUTH_TOKEN = '30621712-67ba58dcdbb82dbab3da918bc';

axios.defaults.baseURL = 'https://pixabay.com';
const requestAdditionalOptions =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

refs.input.addEventListener('input', Debounce(onInput, DEBOUNCE_DELAY));

async function onInput(event) {
  const itemToFind = event.target.value.trim().toLowerCase();
  console.log(itemToFind);
  if (!itemToFind) {
    // clearMarkup();
    return;
  }
  const serverData = await getImages(itemToFind);
  console.log('🚀 ~ file: index.js ~ line 157 ~ onInput ~ serverData', serverData);
  if (serverData.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${serverData.totalHits} images !`);
  clearPage();
  createMarkup(serverData);
}

function clearPage() {
  refs.galleryBlock.innerHTML = '';
}

async function loadMore() {}

async function getImages(itemToFind) {
  let currPage = 1;
  const response = await axios.get(
    `/api/?key=${AUTH_TOKEN}&q=${itemToFind}&${requestAdditionalOptions}&page=${currPage}`
  );

  if (!response.statusText === 'OK') {
    throw new Error();
  }
  // console.log(response.data);

  return response.data;
}

function createMarkup(picturesArray) {
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
