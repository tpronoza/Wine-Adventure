import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR WINES

const dbUrl = clientCredentials.databaseURL;

const getWines = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines.json`)
    .then((response) => {
      if (response.data) {
        axios.get(`${dbUrl}/wines.json?`)
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

const getWinesByUID = (uid) => new Promise((resolve, reject) => {
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

const deleteWine = (wineFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/wines/${wineFirebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleWine = (wineFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines/${wineFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getFavoriteWines = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getFavoriteWinesByUser = (uid) => new Promise((resolve, reject) => {
  getFavoriteWines().then((favoriteWines) => {
    const filteredFavoriteWines = favoriteWines.filter((favoriteWine) => favoriteWine.uid === uid);
    resolve(filteredFavoriteWines);
  })
    .catch((error) => reject(error));
});

const getWishListWines = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines.json?orderBy="wishList"&equalTo=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getWishListWinesByUser = (uid) => new Promise((resolve, reject) => {
  getWishListWines().then((wishListWines) => {
    const filteredwishListWines = wishListWines.filter((wishListWine) => wishListWine.uid === uid);
    resolve(filteredwishListWines);
  })
    .catch((error) => reject(error));
});

const getWineListWines = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wines.json?orderBy="wineList"&equalTo=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getWineListWinesByUser = (uid) => new Promise((resolve, reject) => {
  getWishListWines().then((wineListWines) => {
    const filteredwineListWines = wineListWines.filter((wineListWine) => wineListWine.uid === uid);
    resolve(filteredwineListWines);
  })
    .catch((error) => reject(error));
});

const createWine = (wineObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/wines.json`, wineObj)
    .then((response) => {
      const payload = { wineFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/wines/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateWine = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/wines/${obj.wineFirebaseKey}.json`, obj)
    .then(resolve)
    .catch(reject);
});

export {
  getWines,
  getWinesByUID,
  createWine,
  deleteWine,
  getSingleWine,
  getFavoriteWines,
  getWishListWines,
  getWishListWinesByUser,
  getWineListWines,
  getWineListWinesByUser,
  updateWine,
  getFavoriteWinesByUser,
};
