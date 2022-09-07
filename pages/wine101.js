import { React, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getWines101 } from '../api/wine101Data';
import Wine101Card from '../components/Wine101Card';
import { useAuth } from '../utils/context/authContext';

export default function Wine101() {
  const [wines101, setWine101] = useState([]);
  const { user } = useAuth();

  const getAllTheWines101 = () => {
    getWines101(user.uid).then(setWine101);
  };

  useEffect(() => {
    getAllTheWines101();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/wine101/new" passHref>
        <Button>Add New Wine Article</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {wines101.map((wine101Obj) => (
          <Wine101Card key={wine101Obj.firebaseKey} wine101Obj={wine101Obj} onUpdate={getAllTheWines101} />
        ))}
      </div>
    </div>
  );
}
