/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Wine Adventure is about to begin!</h1>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p>Click the button below to begin your journey!</p>
        <button type="button" className="btn btn-secondary btn-lg copy-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
      <footer className="footer"> </footer>
    </>
  );
}

export default Signin;
