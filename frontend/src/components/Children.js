import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Children = () => {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/children')
      .then(res => setChildren(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddChild = () => {
    axios.post('http://127.0.0.1:5000/children', {
      name,
      age
    })
    .then(res => {
      setChildren([...children, res.data]);
      setName('');
      setAge('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Children</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleAddChild}>Add Child</button>
      <ul>
        {children.map((child) => (
          <li key={child.name}>{child.name}, Age: {child.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default Children;
