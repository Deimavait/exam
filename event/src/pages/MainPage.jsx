import React, { useState, useEffect } from 'react';
import Header from '../components/header/header';
import Form from '../components/header/Form';
import Cards from '../components/header/Cards';
import { useNavigate } from 'react-router-dom';

const fetchParticipants = async ({ setParticipants, token }) => {
  const response = await fetch('http://localhost:8080/registerParticipant', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    // console.log('Fetched data:', data.data);
    setParticipants(data.data);
  } else {
    console.log('Error fetching participants:', response.status);
  }
};

function MainPage() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // navigate back to the login page
      navigate('/');
    } else {
      // Fetch participants if the token exists
      fetchParticipants({ setParticipants, token });
    }
  }, [token, navigate]);

  return (
    <>
      <Header />
      <Form
        fetchParticipants={() => fetchParticipants({ setParticipants, token })}
        selectedParticipant={selectedParticipant}
        onAfterUpdate={() => setSelectedParticipant(null)}
      />
      <Cards
        participants={participants}
        fetchParticipants={() => fetchParticipants({ setParticipants, token })}
        onUpdate={setSelectedParticipant}
      />
    </>
  );
}

export default MainPage;
