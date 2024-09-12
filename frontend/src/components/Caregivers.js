import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/caregivers')
      .then(res => setCaregivers(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddCaregiver = () => {
    axios.post('http://127.0.0.1:5000/caregivers', {
      name,
      contact_info: contactInfo
    })
    .then(res => {
      setCaregivers([...caregivers, res.data]);
      setName('');
      setContactInfo('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Caregivers</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
      />
      <button onClick={handleAddCaregiver}>Add Caregiver</button>
      <ul>
        {caregivers.map((caregiver) => (
          <li key={caregiver.id}>{caregiver.name}, Contact: {caregiver.contact_info}</li>
        ))}
      </ul>
    </div>
  );
};

export default Caregivers;
