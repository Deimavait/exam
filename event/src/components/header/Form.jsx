import React from 'react';
import './Form.css';

function Form() {
  return (
    <>
      <form>
        <h1>Register new participant</h1>
        <label>Name</label>
        <input type='text' />
        <label>Last name</label>
        <input type='text' />
        <label>Email</label>
        <input type='email' />
        <label>Date of birth</label>
        <input type='date' />
        <label>Phone number</label>
        <input type='tel' />
        <button>Register</button>
      </form>
    </>
  );
}

export default Form;
