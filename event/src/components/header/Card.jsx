import React from 'react';
import './Card.css';

const Card = ({ name, lastName, email, dateOfBirth, phoneNumber }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3>
          {name} {lastName}
        </h3>
      </div>
      <div className='card-body'>
        <p>Email: {email}</p>
        <p>Date of birth: {dateOfBirth}</p>
        <p>Phone number: {phoneNumber}</p>
      </div>
      <div className='card-footer'>
        <button type='button' className='btn btn-primary'>
          Update
        </button>
        <button type='button' className='btn btn-danger'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
