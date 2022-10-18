import refs from './js/refs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import Debounce from 'lodash.debounce';
import axios from 'axios';

import { refs } from './js/refs';

const DEBOUNCE_DELAY = 300;
const AUTH_TOKEN = '30621712-67ba58dcdbb82dbab3da918bc';

axios.defaults.baseURL = 'https://pixabay.com';
const requestAdditionalOptions = '&image_type=photo&orientation=horizontal&safesearch=true';

const testRespObj = {
  total: 4692,
  totalHits: 500,
  hits: [
    {
      id: 195893,
      pageURL: 'https://pixabay.com/en/blossom-bloom-flower-195893/',
      type: 'photo',
      tags: 'blossom, bloom, flower',
      previewURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
      previewWidth: 150,
      previewHeight: 84,
      webformatURL: 'https://pixabay.com/get/35bbf209e13e39d2_640.jpg',
      webformatWidth: 640,
      webformatHeight: 360,
      largeImageURL: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
      fullHDURL: 'https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg',
      imageURL: 'https://pixabay.com/get/ed6a9364a9fd0a76647.jpg',
      imageWidth: 4000,
      imageHeight: 2250,
      imageSize: 4731420,
      views: 7671,
      downloads: 6439,
      likes: 5,
      comments: 2,
      user_id: 48777,
      user: 'Josch13',
      userImageURL: 'https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg',
    },
    {
      id: 195893,
      pageURL: 'https://pixabay.com/en/blossom-bloom-flower-195893/',
      type: 'photo',
      tags: 'blossom, bloom, flower',
      previewURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
      previewWidth: 150,
      previewHeight: 84,
      webformatURL: 'https://pixabay.com/get/35bbf209e13e39d2_640.jpg',
      webformatWidth: 640,
      webformatHeight: 360,
      largeImageURL: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
      fullHDURL: 'https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg',
      imageURL: 'https://pixabay.com/get/ed6a9364a9fd0a76647.jpg',
      imageWidth: 4000,
      imageHeight: 2250,
      imageSize: 4731420,
      views: 7671,
      downloads: 6439,
      likes: 5,
      comments: 2,
      user_id: 48777,
      user: 'Josch13',
      userImageURL: 'https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg',
    },
    {
      id: 195893,
      pageURL: 'https://pixabay.com/en/blossom-bloom-flower-195893/',
      type: 'photo',
      tags: 'blossom, bloom, flower',
      previewURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
      previewWidth: 150,
      previewHeight: 84,
      webformatURL: 'https://pixabay.com/get/35bbf209e13e39d2_640.jpg',
      webformatWidth: 640,
      webformatHeight: 360,
      largeImageURL: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
      fullHDURL: 'https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg',
      imageURL: 'https://pixabay.com/get/ed6a9364a9fd0a76647.jpg',
      imageWidth: 4000,
      imageHeight: 2250,
      imageSize: 4731420,
      views: 7671,
      downloads: 6439,
      likes: 5,
      comments: 2,
      user_id: 48777,
      user: 'Josch13',
      userImageURL: 'https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg',
    },
    {
      id: 195893,
      pageURL: 'https://pixabay.com/en/blossom-bloom-flower-195893/',
      type: 'photo',
      tags: 'blossom, bloom, flower',
      previewURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
      previewWidth: 150,
      previewHeight: 84,
      webformatURL: 'https://pixabay.com/get/35bbf209e13e39d2_640.jpg',
      webformatWidth: 640,
      webformatHeight: 360,
      largeImageURL: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
      fullHDURL: 'https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg',
      imageURL: 'https://pixabay.com/get/ed6a9364a9fd0a76647.jpg',
      imageWidth: 4000,
      imageHeight: 2250,
      imageSize: 4731420,
      views: 7671,
      downloads: 6439,
      likes: 5,
      comments: 2,
      user_id: 48777,
      user: 'Josch13',
      userImageURL: 'https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg',
    },
    {
      id: 195893,
      pageURL: 'https://pixabay.com/en/blossom-bloom-flower-195893/',
      type: 'photo',
      tags: 'blossom, bloom, flower',
      previewURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
      previewWidth: 150,
      previewHeight: 84,
      webformatURL: 'https://pixabay.com/get/35bbf209e13e39d2_640.jpg',
      webformatWidth: 640,
      webformatHeight: 360,
      largeImageURL: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
      fullHDURL: 'https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg',
      imageURL: 'https://pixabay.com/get/ed6a9364a9fd0a76647.jpg',
      imageWidth: 4000,
      imageHeight: 2250,
      imageSize: 4731420,
      views: 7671,
      downloads: 6439,
      likes: 5,
      comments: 2,
      user_id: 48777,
      user: 'Josch13',
      userImageURL: 'https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg',
    },
  ],
};

refs.input.addEventListener('input', Debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const itemToFind = event.target.value.trim().toLowerCase();
  console.log(itemToFind);
  if (!itemToFind) {
    // clearMarkup();
    return;
  }
}

async function getImages(itemToFind) {
  const response = await axios.get(
    `/api/?key=${AUTH_TOKEN}&q=${itemToFind}&${requestAdditionalOptions}`
  );
  if (!response.statusText === 'OK') {
    throw new Error();
  }
  // console.log(response.data);

  return response.data;
}

function createMarkup(picturesArray) {
  return picturesArray
    .map(({ webformatURL, largeImageURL, tags, views, downloads, likes, comments }) => {
      return `<div class="gallery">
          <a href="${largeImageURL}" class="gallery_thumb">
            <img src="${webformatURL}" alt="${tags}" />
          </a>

          <div class="gall_desc">
            <div>
              <p class="gall_desc_texxt">Likes</p>
              <p>${likes}</p>
            </div>
            <div>
              <p class="gall_desc_texxt">Views</p>
              <p>${views}</p>
            </div>
            <div>
              <p class="gall_desc_texxt">Comments</p>
              <p>${comments}</p>
            </div>
            <div>
              <p class="gall_desc_texxt">Downloads</p>
              <p>${downloads}</p>
            </div>
          </div>
        </div>`;
    })
    .join('');
}

function makeGallery(markup) {
  refs.galleryBlock.insertAdjacentHTML('afterbegin', markup);
}

getImages('banana');
