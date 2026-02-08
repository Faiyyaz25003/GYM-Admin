
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from './ProfileForm';
import ProfileCard from './ProfileCard';

export default function Profile() {
  const [trainees, setTrainees] = useState([]);
  const [editingTrainee, setEditingTrainee] = useState(null);
  const [profileCreated, setProfileCreated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        fetchMyProfile(storedToken);
      }
    }
  }, []);

  const fetchMyProfile = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/profiles/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profile = res.data ? [res.data] : [];
      setTrainees(profile);
      setProfileCreated(profile.length > 0);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An unknown error occurred';
      console.error('Error fetching profile:', message);
    }
  };

  const handleSave = async (data) => {
    try {
      const currentToken = localStorage.getItem('token');
      let res;

      if (!editingTrainee && trainees.length > 0) {
        alert('Only one profile is allowed per user.');
        return;
      }

      if (editingTrainee) {
        res = await axios.put(
          `http://localhost:5000/api/profiles/${editingTrainee._id}`,
          data,
          { headers: { Authorization: `Bearer ${currentToken}` } }
        );
        setEditingTrainee(null);
      } else {
        res = await axios.post(
          'http://localhost:5000/api/profiles',
          data,
          { headers: { Authorization: `Bearer ${currentToken}` } }
        );
      }

      setTrainees([res.data]);
      setProfileCreated(true);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error saving profile';
      console.error('Error saving profile:', message);
    }
  };

  const handleEdit = (trainee) => {
    setEditingTrainee(trainee);
    setProfileCreated(false);
  };

  const handleDelete = async (id) => {
    try {
      const currentToken = localStorage.getItem('token');

      await axios.delete(`http://localhost:5000/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      setTrainees([]);
      setProfileCreated(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error deleting profile';
      console.error('Error deleting profile:', message);
    }
  };

  const handleCancel = () => {
    setEditingTrainee(null);
    setProfileCreated(true);
  };

  const handleCreateNew = () => {
    setEditingTrainee(null);
    setProfileCreated(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-700">Profile Management</h1>
        {trainees.length === 0 && (
          <button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            + Create New Profile
          </button>
        )}
      </div>

      {!profileCreated && (
        <div className="mb-6">
          <ProfileForm
            trainee={editingTrainee}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {trainees.map((trainee) => (
          <ProfileCard
            key={trainee?._id || trainee?.id}
            trainee={trainee}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
