/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getSingleWine101, deleteWine101 } from '../../api/wine101Data';

export default function ViewWine101() {
  const { uid } = firebase.auth().currentUser;
  const [wine101Details, setWine101Details] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const deleteThis101Wine = () => {
    if (window.confirm(`Delete ${wine101Details.articleName}?`)) {
      deleteWine101(wine101Details.wine101FirebaseKey);
    }
  };

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
          {uid === wine101Details?.uid ? (
            <div>
              <Link href={`/wine101/edit/${wine101Details?.wine101FirebaseKey}`} passHref>
                <Button variant="outline-primary">EDIT</Button>
              </Link>
              <Link href="/wine101" passHref>
                <Button variant="outline-danger" onClick={deleteThis101Wine} className="m-2">DELETE</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
