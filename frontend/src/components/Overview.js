
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Overview = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  const [childrenData, setChildrenData] = useState({ total: 0, active: 0, inactive: 0 });
  const [caregiverData, setCaregiverData] = useState({ total: 0, active: 0, inactive: 0 });
  const [financeData, setFinanceData] = useState({ revenue: 0, income: 0, expenses: 0 });
  const [attendanceData, setAttendanceData] = useState({ total: 0, present: 0, absent: 0 });
  const [enrollmentData, setEnrollmentData] = useState([]);

  useEffect(() => {
    // Fetch data from backend for each section (children, caregivers, finance, etc.)
    axios.get('http://127.0.0.1:5000/children').then(res => {
      const active = res.data.filter(child => child.age > 10).length;
      const inactive = res.data.length - active;
      setChildrenData({ total: res.data.length, active, inactive });
    });

    axios.get('http://127.0.0.1:5000/caregivers').then(res => {
      const active = res.data.filter(caregiver => caregiver.contact_info && caregiver.contact_info.length > 0).length;
      const inactive = res.data.length - active;
      setCaregiverData({ total: res.data.length, active, inactive });
    });

    axios.get('http://127.0.0.1:5000/finances').then(res => {
      const totalRevenue = res.data.reduce((sum, finance) => sum + finance.amount, 0);
      const income = totalRevenue * 0.8;
      const expenses = totalRevenue * 0.2;
      setFinanceData({ revenue: totalRevenue, income, expenses });
    });

    axios.get('http://127.0.0.1:5000/attendances').then(res => {
      const present = res.data.filter(attendance => attendance.status === 'p').length;
      const absent = res.data.filter(attendance => attendance.status === 'a').length;
      setAttendanceData({ total: res.data.length, present, absent });
    });

    axios.get('http://127.0.0.1:5000/enrollments').then(res => {
      const enrollmentsByMonth = Array(12).fill(0);
      res.data.forEach(enrollment => {
        const enrolledMonth = new Date(enrollment.enrolled_date).getMonth();
        enrollmentsByMonth[enrolledMonth] += 1;
      });
      setEnrollmentData(enrollmentsByMonth);
    });
  }, []);

  // Chart data for each section
  const childrenChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [{ label: 'Children', data: [childrenData.active, childrenData.inactive], backgroundColor: ['#36A2EB', '#FF6384'] }],
  };

  const caregiverChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [{ label: 'Caregivers', data: [caregiverData.active, caregiverData.inactive], backgroundColor: ['#36A2EB', '#FF6384'] }],
  };

  const financeChartData = {
    labels: ['Revenue', 'Income', 'Expenses'],
    datasets: [{ label: 'Finance', data: [financeData.revenue, financeData.income, financeData.expenses], backgroundColor: ['#4BC0C0', '#36A2EB', '#FF6384'] }],
  };

  const attendanceChartData = {
    labels: ['Present', 'Absent'],
    datasets: [{ label: 'Attendance', data: [attendanceData.present, attendanceData.absent], backgroundColor: ['#4BC0C0', '#FF6384'] }],
  };

  const enrollmentChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'New Enrollments', data: enrollmentData, backgroundColor: '#36A2EB' }],
  };

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Buttons for navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button style={styles.button} onClick={() => navigate('/attendance')}>Attendance</button>
        <button style={styles.button} onClick={() => navigate('/finance')}>Finance</button>
        <button style={styles.button} onClick={() => navigate('/enrollment')}>Enrollment</button>
        <button style={styles.button} onClick={() => navigate('/children')}>Children</button>
        <button style={styles.button} onClick={() => navigate('/caregivers')}>Caregivers</button>
      </div>

      <h1>Overview</h1>


      {/* First Row: Children, Caregiver, Finance */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={styles.chartContainer}>
          <h2>Children Overview</h2>
          <Doughnut data={childrenChartData} />
        </div>

        <div style={styles.chartContainer}>
          <h2>Caregiver Overview</h2>
          <Doughnut data={caregiverChartData} />
        </div>

        <div style={styles.chartContainer}>
          <h2>Financial Overview</h2>
          <Pie data={financeChartData} />
        </div>
      </div>

      {/* Second Row: Attendance and Enrollment */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={styles.chartContainer}>
          <h2>Attendance Overview</h2>
          <Pie data={attendanceChartData} />
        </div>

        <div style={styles.chartContainerWide}>
          <h2>Enrollment Overview</h2>
          <Bar data={enrollmentChartData} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    width: '20%',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    height: '300px',
  },
  chartContainerWide: {
    width: '48%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    height: '350px',
  },
  button: {
    marginRight: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#4BC0C0',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default Overview;
