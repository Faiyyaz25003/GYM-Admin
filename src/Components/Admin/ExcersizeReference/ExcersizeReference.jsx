'use client';
'use strict';
import { useState, useEffect } from 'react';
import ExcersizeReferenceList from './ExcersizeReferenceList';
import ExcersizeReferenceForm from './ExcersizeReferenceForm';

export default function ExcersizeReference() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'admin');
  }, []);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="max-w-6xl mx-auto mt-2 p-4">
      {/* Header with Add button (only for admin) */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Excersize Reference</h1>
        {isAdmin && (
          <button
            onClick={toggleForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            {showForm ? 'Hide Form' : 'Add Reference'}
          </button>
        )}
      </div>

      {/* Search bar for category */}
      <input
        type="text"
        placeholder="Search by category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Conditional form */}
      {isAdmin && showForm && (
        <div className="mb-6">
          <ExcersizeReferenceForm onAdd={() => setShowForm(false)} />
        </div>
      )}

      {/* Reference list with filter */}
      <ExcersizeReferenceList searchTerm={searchTerm} />
    </div>
  );
}
