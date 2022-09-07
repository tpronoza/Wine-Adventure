/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWine101 } from '../../api/wine101Data';

export default function ViewWine101() {
  const [wine101Details, setWine101Details] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleWine101(firebaseKey).then(setWine101Details);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={wine101Details?.articleImage} alt={wine101Details?.articleName} style={{ text: 'black', hight: '300px', width: 'flex' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          <p>{wine101Details?.articleName}</p>
        </h5>
        <h7>
          <p>{wine101Details?.context}</p>
        </h7>
        {/* <h4>
          <Link>{wine101Details?.articleLink}</Link>
        </h4> */}
        <h5>
          <p> </p>
          <a href={wine101Details?.articleLink} alt={wine101Details?.articleLink}>Link to Continue Reading</a>
        </h5>
      </div>
      {/*
      <WineCard
      wineObj={wineDetails}
      onUpdate={onUpdateDetails} */}

    </div>
  );
}
