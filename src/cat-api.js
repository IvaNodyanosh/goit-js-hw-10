import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_pLBtDSL2f1M4HW8uB9CeZwNj1qruD8aqYWbAN6vTrgdwtqBFUfiFPOHGDAzTrHSh";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/'


import Notiflix from 'notiflix';

import "notiflix/dist/notiflix-3.2.6.min.css";



export function fetchBreeds(){
 return axios.get("/breeds/").then((response) => {
     if (response.status !== 200) {
        
        throw new Error(response.status);
    } return response.data;
 })
};


export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`).then((response) => {
        if (response.status !== 200) {

            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            throw new Error(response.status);
            
        } return response.data;
    })
}