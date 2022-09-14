/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { getWines } from '../api/wineData';
import { useAuth } from '../utils/context/authContext';
import WineCard from '../components/WineCard';

function Home() {
  // TODO: Set a state for wines
  const [wines, setWines] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // TODO: create a function that makes the API call to get all the wines
  const getAllTheWines = () => {
    getWines(user.uid).then(setWines);
  };

  // TODO: make the call to the API to get all the wines on component render
  useEffect(() => {
    getAllTheWines();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = wines.filter((question) => Object.values(question).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(wines); }
  };

  return (
    <>
      <div className="text-center my-4">
        <title>Wine Adventure </title>
        <Form.Control icon="search" placeholder="Search Wine" onChange={(e) => searchItems(e.target.value)} />
        {searchInput.length > 1 ? (
          <div className="d-flex flex-wrap">
            {filteredResults.map((wine) => (
              <WineCard key={wine.firebaseKey} wineObj={wine} onUpdate={getAllTheWines} />
            ))}
          </div>
        ) : (
          <div className="d-flex flex-wrap" />
        )}

      </div>
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
    </>

  );
}

export default Home;
