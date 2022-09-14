/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import firebase from 'firebase/app';
import { getFavoriteWinesByUser } from '../api/wineData';
import { useAuth } from '../utils/context/authContext';
import WineCard from '../components/WineCard';

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  // const { uid } = firebase.auth().currentUser;

  const getAllFavoriteWines = () => {
    getFavoriteWinesByUser(user.uid).then(setFavorites);
  };

  useEffect(() => {
    getAllFavoriteWines();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {favorites?.map((favoriteWine) => (
          <WineCard key={favoriteWine?.firebaseKey} wineObj={favoriteWine} onUpdate={getAllFavoriteWines} />
        ))}
      </div>
    </div>
  );
}

export default Favorite;
