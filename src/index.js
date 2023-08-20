import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_pLBtDSL2f1M4HW8uB9CeZwNj1qruD8aqYWbAN6vTrgdwtqBFUfiFPOHGDAzTrHSh";

import SlimSelect from 'slim-select';

import "slim-select/dist/slimselect.css";

import Notiflix from 'notiflix';

import "notiflix/dist/notiflix-3.2.6.min.css";


import { fetchBreeds } from "./cat-api";

import { fetchCatByBreed } from "./cat-api";

const catsList = document.querySelector('.breed-select');

const catsPosts = document.querySelector('.cat-info');

const catPost = document.querySelector('.box');

const loader = document.querySelector('.loader');

fetchBreeds().then(posts => renderPosts(posts)).catch(error => { Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'); return console.error(error);});


const renderPosts = function (posts) {
    const cats = posts.map(({ id, name }) => { return `<option value="${id}">${name}</option>` }).join('');

    catsList.insertAdjacentHTML("beforeend", cats);

    new SlimSelect({
  select: '.breed-select'
})
};

const createPosts = function (postId) {
    console.log(postId);
    catsPosts.innerHTML = postId.map(({ url, breeds }) => { return `<img src="${url}" alt="${breeds[0].alt_names}" width="500px" height="auto"/><div class="cat-info__box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p>Temperament: ${breeds[0].temperament}</p></div>`}).join('');
    
};

catsList.addEventListener("change", e => { loader.classList.remove("display-none"); catPost.classList.add("display-none"); return fetchCatByBreed(e.currentTarget.value).then(post => { loader.classList.add("display-none"); catPost.classList.remove("display-none"); return createPosts(post) }).catch(error => { Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'); return console.error(error);});});

