
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import { Plus } from 'lucide-react';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/schedules');
      setSchedules(res.data);
    } catch {
      toast.error('Failed to fetch schedules');
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingSchedule) {
        await axios.put(`http://localhost:5000/api/schedules/${editingSchedule._id}`, data);
        toast.success('Schedule updated');
      } else {
        await axios.post('http://localhost:5000/api/schedules', data);
        toast.success('Schedule added');
      }
      setEditingSchedule(null);
      setShowForm(false);
      fetchSchedules();
    } catch {
      toast.error('Failed to save schedule');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`);
      toast.success('Schedule deleted');
      fetchSchedules();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingSchedule(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchSchedules();
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Class Schedule</h1>
        
        {role === 'admin' && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={18} /> Add Schedule
          </button>
        )}
      </div>

      {role === 'admin' && showForm && (
        <ScheduleForm
          onSave={handleSave}
          onCancel={handleCancel}
          editingSchedule={editingSchedule}
        />
      )}

      <ScheduleList
        schedules={schedules}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
