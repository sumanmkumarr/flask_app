// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Enrollment = () => {
//   const [enrollments, setEnrollments] = useState([]);
//   const [childId, setChildId] = useState('');
//   const [date, setDate] = useState('');

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/enrollments')
//       .then(res => setEnrollments(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const handleAddEnrollment = () => {
//     axios.post('http://127.0.0.1:5000/enrollments', {
//       child_id: childId,
//       date
//     })
//     .then(res => {
//       setEnrollments([...enrollments, res.data]);
//       setChildId('');
//       setDate('');
//     })
//     .catch(err => console.log(err));
//   };

//   return (
//     <div>
//       <h2>Enrollment</h2>
//       <input
//         type="number"
//         placeholder="Child ID"
//         value={childId}
//         onChange={(e) => setChildId(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="Date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <button onClick={handleAddEnrollment}>Add Enrollment</button>
//       <ul>
//         {enrollments.map((enroll) => (
//           <li key={enroll.id}>Child ID: {enroll.child_id}, Date: {enroll.date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Enrollment;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [childName, setChildName] = useState('');  // Changed from childId to childName
  const [enrolledDate, setEnrolledDate] = useState('');  // Changed date to enrolledDate

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/enrollments')
      .then(res => setEnrollments(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddEnrollment = () => {
    axios.post('http://127.0.0.1:5000/enrollments', {
      child_name: childName,  // Match this with the backend
      enrolled_date: enrolledDate  // Match this with the backend
    })
    .then(res => {
      setEnrollments([...enrollments, res.data]);
      setChildName('');
      setEnrolledDate('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Enrollment</h2>
      <input
        type="text"
        placeholder="Child Name"  // Changed from Child ID
        value={childName}
        onChange={(e) => setChildName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enrolled Date"  // Changed from Date
        value={enrolledDate}
        onChange={(e) => setEnrolledDate(e.target.value)}
      />
      <button onClick={handleAddEnrollment}>Add Enrollment</button>
      <ul>
        {enrollments.map((enroll) => (
          <li key={enroll.id}>Child Name: {enroll.child_name}, Enrolled Date: {enroll.enrolled_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Enrollment;
