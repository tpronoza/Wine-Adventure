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
    <div className="articleContainer">
      <div
        // className="card"
        style={{
          width: '1200px', margin: '50px', borderRadius: '2%', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="columnOne">
          <img src={wine101Details.articleImage} className="card-img-top" alt={wine101Details.articleName} />
        </div>
        <div className="columnTwo">
          <div
            className="article-body"
            style={{
              height: '60px', margin: '1.5rem',
            }}
          >
            <h2
              className="articleName-title"
              style={{
                margin: 10,
              }}
            >{wine101Details.articleName}
            </h2>
          </div>
          <div className="article-content">
            <div
              className="article-description"
              style={{
                margin: '1.5rem',
              }}
            > {wine101Details.context}
            </div>
          </div>
          <div>
            <h5>
              <p> </p>
              <a href={wine101Details?.articleLink} alt={wine101Details?.articleLink}>Link to Continue Reading</a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
