/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getWineListWinesByUser } from '../api/wineData';
import { useAuth } from '../utils/context/authContext';
import WineCard from '../components/WineCard';

function WineList() {
  const [wineList, setWineList] = useState([]);
  const { user } = useAuth();

  const getAllWineListWines = () => {
    getWineListWinesByUser(user.uid).then(setWineList);
  };

  useEffect(() => {
    getAllWineListWines();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {wineList.map((wineListed) => (
          <WineCard key={wineListed.firebaseKey} wineObj={wineListed} onUpdate={getAllWineListWines} />
        ))}
      </div>

    </div>
  );
}

export default WineList;
