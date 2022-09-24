/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import firebase from 'firebase/app';
import { getSingleWine, deleteWine } from '../../api/wineData';

// import WineCard from '../../components/WineCard';

export default function ViewWine() {
  const { uid } = firebase.auth().currentUser;
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
    <div className="wineViewContainer">
      <div
      // className="card"
        style={{
          width: '1000px', margin: '50px', borderRadius: '2%', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="wineColumnOne">
          <img src={wineDetails?.winePicture} alt={wineDetails?.countryName} style={{ hight: '400px', width: 'flex' }} />
        </div>
        <div className="wineColumnTwo">
          <div
            className="article-body"
            style={{
              height: '80px', margin: '1.5rem',
            }}
          >
            <h2
              className="wineryName"
              style={{
                margin: 10,
              }}
            >{wineDetails?.wineName}
              <h5>
                <p>{wineDetails?.countryName}</p>
                {wineDetails?.yearProduced} {wineDetails?.wineName} by {wineDetails?.wineryName}
              </h5>
            </h2>
          </div>
          <div className="wineViewContainer-content">
            <div
              className="article-description"
              style={{
                margin: '1.5rem',
              }}
            > {wineDetails?.description}
            </div>
            <div
              className="article-price"
              style={{
                margin: '1.5rem',
              }}
            >
              <h3>
                <p> $ {wineDetails?.price}</p>
              </h3>
            </div>
          </div>
          <>
            <p> </p>
            <p><Button variant="link">{wineDetails?.favorite ? '❤️' : '➕' }</Button> Favorite</p>
            <p><Button variant="link">{wineDetails?.wishList ? '🔖' : '➕' }</Button> WishList</p>
            <p><Button variant="link">{wineDetails?.wineList ? '🍷' : '➕' }</Button> WineList</p>
          </>
          {uid === wineDetails?.uid ? (
            <div>
              <Link href={`/wine/edit/${wineDetails?.wineFirebaseKey}`} passHref>
                <Button variant="outline-primary">EDIT</Button>
              </Link>
              <Link href="/" passHref>
                <Button variant="outline-danger" onClick={deleteThisWine} className="m-2">DELETE</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
