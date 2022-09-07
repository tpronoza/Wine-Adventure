import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR WINES

const dbUrl = clientCredentials.databaseURL;

const getWines101 = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines101.json`)
    .then((response) => {
      if (response.data) {
        axios.get(`${dbUrl}/wines101.json?`)
          // eslint-disable-next-line no-shadow
          .then((response) => {
            if (response.data) {
              // eslint-disable-next-line no-console
              resolve(Object.values(response.data));
            } else {
              resolve([]);
            }
          })
          .catch((error) => reject(error));
      }
    });
});

const getWines101ByUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines101.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteWine101 = (wine101FirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/wines101/${wine101FirebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleWine101 = (wine101FirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines101/${wine101FirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createWine101 = (wine101Obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/wines101.json`, wine101Obj)
    .then((response) => {
      const payload = { wine101FirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/wines101/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateWine101 = (wine101Obj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/wines101/${wine101Obj.wine101FirebaseKey}.json`, wine101Obj)
    .then(resolve)
    .catch(reject);
});

export {
  getWines101,
  getWines101ByUID,
  createWine101,
  deleteWine101,
  getSingleWine101,
  updateWine101,
};
