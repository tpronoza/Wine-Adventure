import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWine, updateWine } from '../../api/wineData';

const initialState = {
  wineName: '',
  wineryName: '',
  categoryName: '',
  yearProduced: '',
  winePicture: '',
  description: '',
  type: '',
  price: '',
  favorite: false,
  wishList: false,
  wineList: false,
  countryName: '',
};

function WineForm({ wineObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (wineObj.wineFirebaseKey) setFormInput(wineObj);
  }, [wineObj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wineObj.wineFirebaseKey) {
      updateWine(formInput)
        .then(() => router.push(`/wine/${wineObj.wineFirebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWine(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{wineObj.wineFirebaseKey ? 'Update' : 'Create'} Wine </h2>
      <FloatingLabel controlId="floatingInput1" label="Wine Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Name" name="wineName" value={formInput.wineName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Winery Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Winery Name" name="wineryName" value={formInput.wineryName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Year" className="mb-3">
        <Form.Control type="text" placeholder="Enter Year" name="yearProduced" value={formInput.yearProduced} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Wine Picture" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.winePicture} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Country" className="mb-3">
        <Form.Control type="text" placeholder="Enter Country Name" name="countryName" value={formInput.countryName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Wine Price" className="mb-3">
        <Form.Control type="text" placeholder="Enter price" name="price" value={formInput.price} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect5" label="Select Wine Type">
        <Form.Select name="position" value={formInput.position} onChange={handleChange} className="mb-3" required>
          <option disabled value="">
            Select Wine Type
          </option>
          <option value="Blank"> </option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rose">Rose</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Dessert">Dessert</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea" label="WineDescription" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Is it Your Favorite?"
        checked={formInput.favorite}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          favorite: e.target.checked,
        }))}
      />
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="wishList"
        name="wishList"
        label="Add to Wish List?"
        checked={formInput.wishList}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          wishList: e.target.checked,
        }))}
      />
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="wineList"
        name="wineList"
        label="Add to Wine List?"
        checked={formInput.wineList}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          wineList: e.target.checked,
        }))}
      />
      <Button type="submit">{wineObj.wineFirebaseKey ? 'Update' : 'Create'} Wine</Button>
    </Form>
  );
}

WineForm.propTypes = {
  wineObj: PropTypes.shape({
    winePicture: PropTypes.string,
    wineName: PropTypes.string,
    wineryName: PropTypes.string,
    yearProduced: PropTypes.string,
    countryName: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    wishList: PropTypes.bool,
    wineList: PropTypes.bool,
    favorite: PropTypes.bool,
    wineFirebaseKey: PropTypes.string,
  }),
};

WineForm.defaultProps = {
  wineObj: initialState,
};

export default WineForm;
