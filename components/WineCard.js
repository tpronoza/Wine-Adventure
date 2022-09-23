// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import { FavoriteIcon } from '@mui/icons-material/Favorite';
import {
// BsFillBookmarkPlusFill,
// BsBookmarkDash,
// IoMdHeart,
// IoMdHeartEmpty,
// IoIosListBox,
// IoIosList,
} from 'react-icons/io';
import { deleteWine } from '../api/wineData';

function WineCard({ wineObj, onUpdate }) {
  const { uid } = firebase.auth().currentUser;
  // const [click, setClick] = useState(false);

  // const handleClick = () => setClick(!click);

  const deleteThisWine = () => {
    if (window.confirm(`Delete ${wineObj.wineName}?`)) {
      deleteWine(wineObj.wineFirebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '33rem', margin: '10px', textAlign: 'left' }}>
      <Card.Img variant="top" src={wineObj?.winePicture} alt=".." style={{ height: '230px', width: '35%', margin: '10px' }} />
      <Card.Body>
        <h5>
          <a href={`/wine/${wineObj?.wineFirebaseKey}`}>{wineObj?.wineName} {wineObj?.yearProduced}</a>
          <p key="{wineObj?.wineryName}">{wineObj?.wineryName}</p>
          <p key="{wineObj?.countryName}">{wineObj?.countryName}</p>
        </h5>
        {/* <div className="favoriteList">
            {click ? <IoMdHeart onClick={handleClick} />
              : <IoMdHeartEmpty onClick={handleClick} />}
          </div> */}
        {/* <div className="wineList">
            {click ? <IoIosListBox onClick={handleClick} />
              : <IoIosList onClick={handleClick} />}
          </div>
          <div className="wishList">
            {click ? <BsFillBookmarkPlusFill onClick={handleClick} />
              : <BsBookmarkDash onClick={handleClick} />}
          </div> */}
        {/* {uid === wineObj?.uid ? ( */}
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions> */}
        <div className="btn-group-vertical">
          <p><Button variant="link">{wineObj?.favorite ? '❤️' : '➕' }</Button> Favorite</p>
          <p><Button variant="link">{wineObj?.wishList ? '📋' : '➕' }</Button> WishList</p>
          <p><Button variant="link">{wineObj?.wineList ? '🍷' : '➕' }</Button> WineList</p>
        </div>
        {/* ) : null}  */}
        {/* <>
          <button type="button" className="icons btn btn-light">
            <h3><BsFillBookmarkPlusFill /></h3>
          </button>
        </> */}

        {/* <p className="card-text">{wineObj?.description}</p> */}
        {uid === wineObj?.uid ? (
          <div className="btn-group-horizontal">
            <Link href={`/wine/edit/${wineObj?.wineFirebaseKey}`} passHref>
              <Button variant="outline-info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisWine} className="m-2">DELETE</Button>
          </div>
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
    favorite: PropTypes.bool,
    uid: PropTypes.string,
    wineFirebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WineCard;
