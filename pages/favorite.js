/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getFavoriteWines } from '../api/wineData';
import { useAuth } from '../utils/context/authContext';
import WineCard from '../components/WineCard';

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const getAllFavoriteWines = () => {
    getFavoriteWines(user.uid).then(setFavorites);
  };

  useEffect(() => {
    getAllFavoriteWines();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {favorites.map((favoriteWine) => (
          <WineCard key={favoriteWine.firebaseKey} wineObj={favoriteWine} onUpdate={getAllFavoriteWines} />
        ))}
      </div>

    </div>
  );
}

export default Favorite;
