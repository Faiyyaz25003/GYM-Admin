
'use client';
import React, { useEffect, useState } from 'react';
import {
  Pencil,
  Trash,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  UserCircle2,
} from 'lucide-react';

const TraineeCard = ({ trainee, onEdit, onDelete }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-auto border border-gray-200 hover:shadow-2xl transition-all duration-300">
      
      {/* Profile Picture or Initial */}
      <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-3 flex items-center justify-center text-white font-bold text-3xl bg-gradient-to-br from-blue-500 to-purple-600">
        {trainee.profilePic ? (
          <img
            src={trainee.profilePic}
            alt={trainee.name}
            className="w-full h-full object-cover"
          />
        ) : (
          trainee.name?.charAt(0).toUpperCase() || 'T'
        )}
      </div>

      {/* Name & Course */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <UserCircle2 size={20} className="text-purple-500" />
          {trainee.name}
        </h2>
        <p className="mt-1 inline-block text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium shadow-sm">
          {trainee.course}
        </p>
      </div>

      {/* Trainee Info */}
      <div className="text-sm text-gray-700 mt-4 space-y-2 border-t pt-4">
        <p className="flex items-center gap-2">
          <Mail size={16} className="text-purple-500" />
          <span className="truncate">{trainee.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} className="text-purple-500" />
          {trainee.phone}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-purple-500" />
          <span className="truncate">{trainee.address}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={16} className="text-green-600" />
          Joined: <span className="font-medium">{new Date(trainee.joinDate).toLocaleDateString()}</span>
        </p>
      </div>

      {/* Action Buttons - only for admin */}
      {isAdmin && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => onEdit(trainee)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(trainee._id)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
          >
            <Trash size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TraineeCard;
