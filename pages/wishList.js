/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getWishListWinesByUser } from '../api/wineData';
import { useAuth } from '../utils/context/authContext';
import WineCard from '../components/WineCard';

function WishList() {
  const [wishList, setWishList] = useState([]);
  const { user } = useAuth();

  const getAllWishListWines = () => {
    getWishListWinesByUser(user.uid).then(setWishList);
  };

  useEffect(() => {
    getAllWishListWines();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {wishList.map((wishListed) => (
          <WineCard key={wishListed.firebaseKey} wineObj={wishListed} onUpdate={getAllWishListWines} />
        ))}
      </div>

    </div>
  );
}

export default WishList;
