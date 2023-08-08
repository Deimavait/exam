import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Cards.css';

const Cards = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:8080/registerParticipant',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log('Fetched data:', data.data);
        setParticipants(data.data);
      } else {
        console.log('Error fetching participants:', response.status);
      }
    };
    fetchParticipants();
  }, []);

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
          />
        ))
      ) : (
        <p>No participants found.</p>
      )}
    </div>
  );
};

export default Cards;
