/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWine } from '../../api/wineData';

export default function ViewWine() {
  const [wineDetails, setWineDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { wineFirebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleWine(wineFirebaseKey).then(setWineDetails);
  }, [wineFirebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={wineDetails.winePicture} alt={wineDetails.countryName} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          <p>{wineDetails.wineryName}</p>
          {wineDetails.yearProduced} {wineDetails.wineName} by {wineDetails.wineryName}
        </h5>
        <h4>
          <p>{wineDetails.countryName}</p>
          <p>${wineDetails.price}</p>
        </h4>

      </div>
      <p>{wineDetails.description}</p>
    </div>
  );
}
