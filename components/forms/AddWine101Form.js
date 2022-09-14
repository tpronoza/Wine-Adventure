import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWine101, updateWine101 } from '../../api/wine101Data';

const initialState = {
  articleName: '',
  context: '',
  articleImage: '',
  articleLink: '',
};

function Wine101Form({ wine101Obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (wine101Obj.wine101FirebaseKey) setFormInput(wine101Obj);
  }, [wine101Obj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wine101Obj.wine101FirebaseKey) {
      updateWine101(formInput)
        .then(() => router.push(`/wine101/${wine101Obj.wine101FirebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWine101(payload).then(() => {
        router.push('/wine101');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{wine101Obj?.wine101FirebaseKey ? 'Update' : 'Create'} Wine Article</h2>
      <FloatingLabel controlId="floatingInput1" label="Wine Article Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Article Title " name="articleName" value={formInput.articleName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Article Content" className="mb-3">
        <Form.Control type="text" placeholder="Enter Article Content" name="context" value={formInput.context} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Wine Artile Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter article image url" name="articleImage" value={formInput.articleImage} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Wine Article Link" className="mb-3">
        <Form.Control type="text" placeholder="Enter Wine Article Link" name="articleLink" value={formInput.articleLink} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{wine101Obj?.wine101FirebaseKey ? 'Update' : 'Create'} Wine Article</Button>
    </Form>
  );
}

Wine101Form.propTypes = {
  wine101Obj: PropTypes.shape({
    articleName: PropTypes.string,
    context: PropTypes.string,
    articleImage: PropTypes.string,
    articleLink: PropTypes.string,
    uid: PropTypes.string,
    wine101FirebaseKey: PropTypes.string,
  }),
};

Wine101Form.defaultProps = {
  wine101Obj: initialState,
};

export default Wine101Form;
