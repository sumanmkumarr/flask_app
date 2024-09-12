import React, { useState, useEffect } from "react";
import axios from "axios";

const Finance = () => {
    const [finances, setFinances] = useState([]);
    const [financeAmount, setFinanceAmount] = useState("");
    const [financeType, setFinanceType] = useState("");

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
                type: financeType,
            };
            await axios.post("http://127.0.0.1:5000/finances", newFinance);
            fetchFinances(); // Refresh finance list
        } catch (error) {
            console.error("Error adding finance", error);
        }
    };

    return (
        <div>
            <h2>Finance Information</h2>
            <input
                type="text"
                placeholder="Finance Type"
                value={financeType}
                onChange={(e) => setFinanceType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Finance Amount"
                value={financeAmount}
                onChange={(e) => setFinanceAmount(e.target.value)}
            />
            <button onClick={addFinance}>Add Finance</button>

            <h3>Finance List</h3>
            <ul>
                {finances.map((finance, index) => (
                    <li key={index}>
                        {finance.type}, Amount: {finance.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Finance;
