import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
import { deleteWine101 } from '../api/wine101Data';

function Wine101Card({ wine101Obj, onUpdate }) {
  const { uid } = firebase.auth().currentUser;
  const deleteThisWine101 = () => {
    if (window.confirm(`Delete ${wine101Obj.articleName}?`)) {
      deleteWine101(wine101Obj.wine101FirebaseKey).then(() => onUpdate());
    }
  };

  return (

    <Card style={{ width: '35rem', margin: '10px', textAlign: 'left' }}>
      <Card.Img variant="top" src={wine101Obj?.articleImage} alt=".." style={{ height: '400px' }} />
      <Card.Body>
        <h5>
          <a href={`/wine101/${wine101Obj?.wine101FirebaseKey}`}>{wine101Obj?.articleName}</a>
        </h5>
        <p className="card-text">{wine101Obj?.context}</p>
        {uid === wine101Obj.uid ? (
          <>
            <Link href={`/wine101/edit/${wine101Obj?.wine101FirebaseKey}`} passHref>
              <Button variant="outline-info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisWine101} className="m-2">DELETE</Button>
          </>
        ) : null}
      </Card.Body>
    </Card>
  );
}

Wine101Card.propTypes = {
  wine101Obj: PropTypes.shape({
    articleName: PropTypes.string,
    context: PropTypes.string,
    articleImage: PropTypes.string,
    articleLink: PropTypes.string,
    uid: PropTypes.string,
    wine101FirebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Wine101Card;
