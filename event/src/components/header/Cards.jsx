import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Cards.css';

const Cards = ({ participants, fetchParticipants, onUpdate }) => {
  const token = localStorage.getItem('token');

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/registerParticipant/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => fetchParticipants());
  };

  return (
    <div className='cards'>
      {participants.length > 0 ? (
        participants.map((participant) => (
          <Card
            key={participant.id}
            name={participant.name}
            lastName={participant.lastName}
            email={participant.email}
            dateOfBirth={participant.dateOfBirth}
            phoneNumber={participant.phoneNumber}
            handleDelete={() => handleDelete(participant.id)}
            onUpdate={() => onUpdate(participant)}
          />
        ))
      ) : (
        <p>No participants found.</p>
      )}
    </div>
  );
};

export default Cards;
