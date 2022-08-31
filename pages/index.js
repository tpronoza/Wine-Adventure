/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getWines } from '../api/wineData';
import { useAuth } from '../utils/context/authContext';
import WineCard from '../components/WineCard';

function Home() {
  // TODO: Set a state for wines
  const [wines, setWines] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the wines
  const getAllTheWines = () => {
    getWines(user.uid).then(setWines);
  };

  // TODO: make the call to the API to get all the wines on component render
  useEffect(() => {
    getAllTheWines();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/wine/new" passHref>
        <Button>Add A Wine</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over wines here using WineCard component */}
        {wines.map((wine) => (
          <WineCard key={wine.firebaseKey} wineObj={wine} onUpdate={getAllTheWines} />
        ))}
      </div>

    </div>
  );
}

export default Home;
