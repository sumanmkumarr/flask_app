import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [childId, setChildId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/attendance')
      .then(res => setAttendance(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddAttendance = () => {
    axios.post('http://127.0.0.1:5000/attendance', {
      child_id: childId,
      status
    })
    .then(res => {
      setAttendance([...attendance, res.data]);
      setChildId('');
      setStatus('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Attendance</h2>
      <input
        type="number"
        placeholder="Child ID"
        value={childId}
        onChange={(e) => setChildId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleAddAttendance}>Add Attendance</button>
      <ul>
        {attendance.map((entry) => (
          <li key={entry.id}>Child ID: {entry.child_id}, Status: {entry.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Attendance = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [childId, setChildId] = useState('');
//   const [status, setStatus] = useState('');
//   const [date, setDate] = useState('');

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/attendances')
//       .then(res => setAttendance(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const handleAddAttendance = () => {
//     axios.post('http://127.0.0.1:5000/attendances', {
//       child_id: childId,
//       status: status,
//       date: date  // Send the date field
//     })
//     .then(res => {
//       setAttendance([...attendance, { child_id: childId, status: status, date: date }]); // Update the frontend with new entry
//       setChildId('');
//       setStatus('');
//       setDate('');
//     })
//     .catch(err => console.log(err));
//   };

//   return (
//     <div>
//       <h2>Attendance</h2>
//       <input
//         type="number"
//         placeholder="Child ID"
//         value={childId}
//         onChange={(e) => setChildId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Status"
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="Date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <button onClick={handleAddAttendance}>Add Attendance</button>
//       <ul>
//         {attendance.map((entry) => (
//           <li key={entry.id}>Date: {entry.date}, Child ID: {entry.child_id}, Status: {entry.status}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Attendance;
