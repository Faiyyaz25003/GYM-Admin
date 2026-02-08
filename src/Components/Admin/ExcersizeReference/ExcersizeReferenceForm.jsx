
'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function ExcersizeReferenceForm({ onAdd }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('Diet');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl || !category || !description) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ExcersizeReference', {
        videoUrl, category, description
      });
      onAdd(res.data);
      setVideoUrl('');
      setCategory('Diet');
      setDescription('');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Add New Video</h3>

      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
        disabled={loading}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
        disabled={loading}
      >
        <option value="Diet">Diet</option>
        <option value="Exercise">Exercise</option>
        <option value="Workout">Workout</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !videoUrl}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        {loading ? 'Adding...' : 'Add Video'}
      </button>
    </form>
  );
}
