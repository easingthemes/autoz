const { fetch } = require('cross-fetch');

const API_URL = 'https://listing-creation.api.autoscout24.com';
const ENDPOINTS = {
  makes: 'makes'
}

fetch(`${API_URL}/${ENDPOINTS.makes}`)
  .then((r) => r.json())
  .then((data) => {
    console.log({data});
  })
  .catch((e) => {
    console.log({e});
  });
