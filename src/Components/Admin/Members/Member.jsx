

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import MemberForm from './MemberForm';
import MemberList from './MemberList';
import 'react-toastify/dist/ReactToastify.css';

const Member = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ Search input state

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members');
      setMembers(res.data);
    } catch (err) {
      toast.error('Failed to fetch members');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingMember) {
        await axios.put(`http://localhost:5000/api/members/${editingMember._id}`, data);
        toast.success('Member updated');
      } else {
        await axios.post('http://localhost:5000/api/members', data);
        toast.success('Member added');
      }
      fetchMembers();
      setEditingMember(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error saving member');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      toast.success('Member deleted');
      fetchMembers();
    } catch (err) {
      toast.error('Failed to delete member');
    }
  };

  // ✅ Filter logic
  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Gym Members</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setEditingMember(null);
            setShowForm(true);
          }}
        >
          Add Member
        </button>
      </div>

      {/* ✅ Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search trainees..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <MemberForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
          editingMember={editingMember}
        />
      )}

      {/* ✅ Use filtered list */}
      <MemberList members={filteredMembers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Member;
