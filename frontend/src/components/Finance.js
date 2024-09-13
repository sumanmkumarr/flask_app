
import React, { useState, useEffect } from "react";
import axios from "axios";

const Finance = () => {
  const [finances, setFinances] = useState([]);
  const [financeAmount, setFinanceAmount] = useState("");
  const [financeDescription, setFinanceDescription] = useState("");

  useEffect(() => {
    fetchFinances();
  }, []);

  const fetchFinances = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/finances");
      setFinances(response.data);
    } catch (error) {
      console.error("Error fetching finances", error);
    }
  };

  const addFinance = async () => {
    try {
      const newFinance = {
        amount: financeAmount,
        description: financeDescription, // Correct field name
      };
      await axios.post("http://127.0.0.1:5000/finances", newFinance);
      fetchFinances(); // Refresh finance list after adding
      // Clear input fields after submission
      setFinanceAmount("");
      setFinanceDescription("");
    } catch (error) {
      console.error("Error adding finance", error);
    }
  };

  return (
    <div>
      <h2>Finance Information</h2>
      <input
        type="text"
        placeholder="Finance Description"
        value={financeDescription}
        onChange={(e) => setFinanceDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Finance Amount"
        value={financeAmount}
        onChange={(e) => setFinanceAmount(e.target.value)}
      />
      <button onClick={addFinance}>Add Finance</button>

      <h3>Finance List</h3>
      <ul>
        {finances.map((finance, index) => (
          <li key={index}>
            {finance.description}, Amount: {finance.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Finance;
