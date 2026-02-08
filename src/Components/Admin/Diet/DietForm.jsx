import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DietForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/auth/users');
        setUsers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        toast.error('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || userIds.length === 0) {
      setError('All fields are required and at least one user must be selected.');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('http://localhost:5000/api/diets', {
        title,
        description,
        userIds, // This will be mapped to 'users' in backend
      });
      setTitle('');
      setDescription('');
      setUserIds([]);
      setError('');
      onSuccess?.();
      toast.success('✅ Diet assigned successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to assign diet.');
      toast.error('Failed to assign diet.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">📋 Assign Diet Plan</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title (e.g., Keto Plan)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <label className="block mb-2 font-medium">Assign to Users:</label>
          {loading ? (
            <p className="text-sm text-gray-500">Loading users...</p>
          ) : (
            <select
              multiple
              value={userIds}
              onChange={(e) =>
                setUserIds(Array.from(e.target.selectedOptions, (o) => o.value))
              }
              className="w-full h-32 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filtered.map((user) => (
                <option value={user._id} key={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Assigning...' : 'Assign Diet'}
        </button>
      </form>
    </div>
  );
};

export default DietForm;