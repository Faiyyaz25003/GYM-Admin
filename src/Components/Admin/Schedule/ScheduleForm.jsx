

import React, { useEffect, useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';

export default function ScheduleForm({ onSave, onCancel, editingSchedule }) {
  const [form, setForm] = useState({
    title: '',
    trainer: '',
    course: '',
    time: '',
    days: [],
    room: '',
  });

  const [trainers, setTrainers] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (editingSchedule) {
      setForm(editingSchedule);
    } else {
      setForm({ title: '', trainer: '', course: '', time: '', days: [], room: '' });
    }
  }, [editingSchedule]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/trainees`);
        setTrainers(res.data);
      } catch (err) {
        console.error('Error fetching trainers:', err);
      }
    };

    fetchTrainers();
  }, []);

  const toggleDay = (day) => {
    setForm((prevForm) => ({
      ...prevForm,
      days: prevForm.days.includes(day)
        ? prevForm.days.filter((d) => d !== day)
        : [...prevForm.days, day],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ title: '', trainer: '', course: '', time: '', days: [], room: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="border rounded px-4 py-2 w-full"
        />
        <select
          value={form.trainer}
          onChange={(e) => setForm({ ...form, trainer: e.target.value })}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">Select Trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer._id} value={trainer.name}>
              {trainer.name}
            </option>
          ))}
        </select>
        <input
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          placeholder="Course Type"
          className="border rounded px-4 py-2 w-full"
        />
        <input
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          placeholder="Time Slot"
          className="border rounded px-4 py-2 w-full"
        />
        <div className="col-span-1 md:col-span-2">
          <input
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
            placeholder="Room / Studio"
            className="border rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-2">Days</p>
        <div className="flex flex-wrap gap-2">
          {allDays.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-1 rounded-full border ${
                form.days.includes(day)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <FaSave /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <FaTimes /> Cancel
        </button>
      </div>
    </form>
  );
}