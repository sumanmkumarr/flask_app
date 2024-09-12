// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Children from "./components/Children";
// import Caregivers from "./components/Caregivers";
// import Attendance from "./components/Attendance";
// import Enrollment from "./components/Enrollment";
// import Finance from "./components/Finance";

// function App() {
//     return (
//         <Router>
//             <div>
//                 <Switch>
//                     <Route path="/children" component={Children} />
//                     <Route path="/caregivers" component={Caregivers} />
//                     <Route path="/attendances" component={Attendance} />
//                     <Route path="/enrollments" component={Enrollment} />
//                     <Route path="/finances" component={Finance} />
//                 </Switch>
//             </div>
//         </Router>
//     );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Attendance from './components/Attendance';
import Caregiver from './components/Caregivers';
import Children from './components/Children';
import Enrollment from './components/Enrollment';
import Finance from './components/Finance';

function App() {
  return (
    <Router>
      <div>
        <h1>Childcare Management System</h1>
        <Routes>
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/caregiver" element={<Caregiver />} />
          <Route path="/children" element={<Children />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
