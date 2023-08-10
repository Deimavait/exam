import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = ({ fetchParticipants, selectedParticipant, onAfterUpdate }) => {
  const [inputs, setInputs] = useState({
    name: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (selectedParticipant) {
      setInputs({
        ...selectedParticipant,
        dateOfBirth: selectedParticipant.dateOfBirth.substring(0, 10),
      });
    }
  }, [selectedParticipant]);

  const [token, setToken] = useState('');

  useEffect(() => {
    // Get the token from localStorage
    const getToken = async () => {
      const token = localStorage.getItem('token');
      setToken(token);
    };

    getToken();
  }, []);

  // update

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/registerParticipant/${selectedParticipant.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Successfully updated!');
        fetchParticipants();
        onAfterUpdate();
        setInputs({
          name: '',
          lastName: '',
          email: '',
          dateOfBirth: '',
          phoneNumber: '',
        });
      } else {
        console.log('Failed to update participant');
      }
    } catch (error) {
      console.error('Error updating participant:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the value of the inputs state variable
    setInputs({ ...inputs, [name]: value });
  };

  const [successMessage, setSuccessMessage] = useState('');

  // Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/registerParticipant', {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    try {
      if (response.status === 201) {
        setSuccessMessage('Successfully registered!');
        fetchParticipants();
        // Clear the inputs
        setInputs({
          name: '',
          lastName: '',
          email: '',
          dateOfBirth: '',
          phoneNumber: '',
        });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={selectedParticipant ? handleUpdate : handleSubmit}>
          <h1>Register new participant</h1>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <label>Last name</label>
          <input
            type='text'
            name='lastName'
            value={inputs.lastName}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <label>Date of birth</label>
          <input
            type='date'
            name='dateOfBirth'
            value={inputs.dateOfBirth}
            onChange={handleChange}
            required
          />
          <label>Phone number</label>
          <input
            type='tel'
            name='phoneNumber'
            value={inputs.phoneNumber}
            onChange={handleChange}
            required
          />
          {successMessage && <span>{successMessage}</span>}
          {selectedParticipant ? (
            <button>Update</button>
          ) : (
            <button>Register</button>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;
