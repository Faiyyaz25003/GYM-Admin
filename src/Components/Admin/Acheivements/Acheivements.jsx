

'use client';
import React, { useState, useEffect } from 'react';
import TrainerForm from './AcheivementsForm';
import TrainersList from './AcheivementsList';

const Acheivements = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Acheivements</h1>
        {isAdmin && (
          <button
            onClick={toggleForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            {showForm ? 'Close Form' : 'Add Achievement'}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="mb-8">
          <TrainerForm
            onCreated={() => {
              setShowForm(false);
            }}
          />
        </div>
      )}

      <TrainersList />
    </div>
  );
};

export default Acheivements;
