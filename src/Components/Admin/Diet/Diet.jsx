
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DietForm from './DietForm';
import DietList from './DietList';

const Diet = () => {
  const [diets, setDiets] = useState([]);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchDiets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/diets');
      setDiets(res.data);
    } catch (err) {
      console.error('Error fetching diets:', err);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId'); // 👈 Add this in login
    setRole(storedRole);
    setUserId(storedUserId);
    fetchDiets();
  }, []);

  // 🧠 Filter diets based on user ID if not admin
  const filteredDiets =
    role === 'admin'
      ? diets
      : diets.filter((diet) =>
          diet.users?.some((user) => user._id === userId)
        );

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-8">
      {role === 'admin' && <DietForm onSuccess={fetchDiets} />}
      <DietList diets={filteredDiets} />
    </div>
  );
};

export default Diet;
