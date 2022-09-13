/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getSingleWine, deleteWine } from '../../api/wineData';

// import WineCard from '../../components/WineCard';

export default function ViewWine() {
  const [wineDetails, setWineDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const deleteThisWine = () => {
    if (window.confirm(`Delete ${wineDetails.wineName}?`)) {
      deleteWine(wineDetails.wineFirebaseKey);
    }
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleWine(firebaseKey).then(setWineDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={wineDetails?.winePicture} alt={wineDetails?.countryName} style={{ hight: '300px', width: 'flex' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          <p>{wineDetails?.wineryName}</p>
          {wineDetails?.yearProduced} {wineDetails?.wineName} by {wineDetails?.wineryName}
        </h5>
        <h4>
          <p>{wineDetails?.countryName}</p>
          <p>${wineDetails?.price}</p>
        </h4>
        <>
          <p><Button className="card-text bold">{wineDetails?.favorite ? '🤍' : ' ' }</Button> Favorite</p>
          <p><Button type="button" className="card-text">{wineDetails?.wishList ? '🏷️' : ' ' }</Button> WishList</p>
          <p><Button className="card-text bold">{wineDetails?.wineList ? '🏷️🏷️' : ' ' }</Button> WineList</p>
        </>
      </div>
      <p>{wineDetails?.description}</p>

      {/* <WineCard
      wineObj={wineDetails}
      onUpdate={onUpdateDetails} /> */}

      <div>
        <Link href={`/wine/edit/${wineDetails?.wineFirebaseKey}`} passHref>
          <Button variant="outline-info">EDIT</Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="danger" onClick={deleteThisWine} className="m-2">DELETE</Button>
        </Link>
      </div>
      {/* <div className="text-white ms-5 details">
        <h5>
          {wineDetails?.wine101Obj?.favorite ? '🤍' : ''}
        </h5>
      </div> */}
    </div>
  );
}
