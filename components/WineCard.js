import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
import { deleteWine } from '../api/wineData';

function WineCard({ wineObj, onUpdate }) {
  const { uid } = firebase.auth().currentUser;
  const deleteThisWine = () => {
    if (window.confirm(`Delete ${wineObj.wineName}?`)) {
      deleteWine(wineObj.wineFirebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '40rem', margin: '10px', textAlign: 'left' }}>
      <Card.Img variant="top" src={wineObj.winePicture} alt=".." style={{ height: '400px' }} />
      <Card.Body>
        <h5>
          <a href={`/wine/${wineObj.wineFirebaseKey}`}>{wineObj.wineName} {wineObj.yearProduced}</a>
          <p>{wineObj.wineryName}</p>
          <p>{wineObj.countryName}</p>
        </h5>

        <p className="card-text">{wineObj.description}</p>
        {uid === wineObj.uid ? (
          <>
            <Link href={`/wine/edit/${wineObj.wineFirebaseKey}`} passHref>
              <Button variant="outline-info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisWine} className="m-2">DELETE</Button>
          </>
        ) : null}

      </Card.Body>
    </Card>
  );
}

WineCard.propTypes = {
  wineObj: PropTypes.shape({
    winePicture: PropTypes.string,
    wineName: PropTypes.string,
    wineryName: PropTypes.string,
    yearProduced: PropTypes.string,
    countryName: PropTypes.string,
    categoryName: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    wishList: PropTypes.bool,
    wineList: PropTypes.bool,
    favotite: PropTypes.bool,
    uid: PropTypes.string,
    wineFirebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WineCard;
