import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWine, updateWine } from '../../api/wineData';
import getCategories from '../../api/categoryData';

const initialState = {
  wineName: '',
  wineryName: '',
  categoryName: '',
  yearProduced: '',
  winePicture: '',
  description: '',
  wineType: '',
  price: '',
  favorite: false,
  wishList: false,
  wineList: false,
  countryName: '',
};

function WineForm({ wineObj }) {
  const [wineInput, setWineInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);
    if (wineObj?.wineFirebaseKey) setWineInput(wineObj);
  }, [wineObj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWineInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wineObj?.wineFirebaseKey) {
      updateWine(wineInput)
        .then(() => router.push(`/wine/${wineObj.wineFirebaseKey}`));
    } else {
      const payload = { ...wineInput, uid: user.uid };
      createWine(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{wineObj?.wineFirebaseKey ? 'Update' : 'Create'} Wine </h2>
      <FloatingLabel controlId="floatingInput1" label="Wine Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Name" name="wineName" value={wineInput.wineName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Winery Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Winery Name" name="wineryName" value={wineInput.wineryName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Year" className="mb-3">
        <Form.Control type="text" placeholder="Enter Year" name="yearProduced" value={wineInput.yearProduced} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Wine Picture" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="winePicture" value={wineInput.winePicture} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput5" label="Country" className="mb-3">
        <Form.Control type="text" placeholder="Enter Country Name" name="countryName" value={wineInput.countryName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput6" label="Wine Price" className="mb-3">
        <Form.Control type="text" placeholder="Enter price" name="price" value={wineInput.price} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput7" label="Wine Type: Cab, Pino Noir and etc." className="mb-3">
        <Form.Control type="text" placeholder="Enter Wine Type" name="wineType" value={wineInput.wineType} onChange={handleChange} required />
      </FloatingLabel>
      {/* <FloatingLabel controlId="floatingSelect1" label="Select Wine Category">
        <Form.Select name="categoryName" value={wineInput.categoryName} onChange={handleChange} className="mb-3" required>
          <option disabled value="">
            Select Wine Category
          </option>
          <option value="Blank"> </option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rose">Rose</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Dessert">Dessert</option>
        </Form.Select>
      </FloatingLabel> */}

      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="categoryName" name="categoryName" onChange={handleChange} className="mb-3" value={wineInput?.categoryName} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.categoryName} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="WineDescription" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={wineInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Is it Your Favorite?"
        checked={wineInput.favorite}
        onChange={(e) => setWineInput((prevState) => ({
          ...prevState,
          favorite: e.target.checked,
        }))}
      />
      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="wishList"
        name="wishList"
        label="Add to Wish List?"
        checked={wineInput.wishList}
        onChange={(e) => setWineInput((prevState) => ({
          ...prevState,
          wishList: e.target.checked,
        }))}
      />
      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="wineList"
        name="wineList"
        label="Add to Wine List?"
        checked={wineInput.wineList}
        onChange={(e) => setWineInput((prevState) => ({
          ...prevState,
          wineList: e.target.checked,
        }))}
      />
      {/* <div className="btn-group-vertical"> */}
      <Button type="submit" className="btn btn-secondary btn-sml copy-btn">{wineObj?.wineFirebaseKey ? 'Update' : 'Create'} Wine</Button>
      {/* </div> */}
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
    categoryName: PropTypes.string,
    wineType: PropTypes.string,
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
