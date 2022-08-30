import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR WINES

const dbUrl = clientCredentials.databaseURL;

const getWines = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteWine = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/wines/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleWine = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createWine = (wineObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, wineObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/wines/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateWine = (wineObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/wines/${wineObj.firebaseKey}.json`, wineObj)
    .then(resolve)
    .catch(reject);
});

export {
  getWines,
  createWine,
  deleteWine,
  getSingleWine,
  updateWine,
};
