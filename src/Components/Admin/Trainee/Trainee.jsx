'use client';
import React, { useState, useEffect } from 'react';
import TraineeForm from './TraineeForm';
import TraineeList from './TraineeList';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Trainee() {
  const [trainees, setTrainees] = useState([]);
  const [editingTrainee, setEditingTrainee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTrainees();

    // Get role from localStorage
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const fetchTrainees = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/trainees`);
      setTrainees(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch trainees');
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingTrainee && editingTrainee._id) {
        await axios.put(`${BASE_URL}/api/trainees/${editingTrainee._id}`, data);
        toast.success('Trainee updated');
      } else {
        await axios.post(`${BASE_URL}/api/trainees`, data);
        toast.success('Trainee added');
      }
      fetchTrainees();
      setEditingTrainee(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save trainee');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error('Missing ID');
      await axios.delete(`${BASE_URL}/api/trainees/${id}`);
      toast.success('Trainee deleted');
      fetchTrainees();
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete trainee');
    }
  };

  const handleEdit = (trainee) => {
    setEditingTrainee(trainee);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTrainee(null);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Trainers</h1>

        {role === 'admin' && !showForm && (
          <button
            onClick={() => {
              setEditingTrainee(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Trainer
          </button>
        )}
      </div>

      {role === 'admin' && showForm && (
        <TraineeForm
          trainee={editingTrainee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <TraineeList
        trainees={trainees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
