
'use client';
import React, { useEffect, useState } from 'react';
import { User, BookOpen, Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react';

export default function ScheduleCard({ schedule, onEdit, onDelete }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100 overflow-hidden transform hover:-translate-y-1">
      {/* Header with gradient accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

      {/* Main content */}
      <div className="p-6">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            {schedule.title}
          </h2>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Details with icons */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
            <User className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{schedule.trainer}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span>{schedule.course}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
            <Calendar className="w-5 h-5 text-purple-500" />
            <div className="flex flex-wrap gap-1">
              {schedule.days.map((day, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="font-mono bg-orange-50 px-2 py-1 rounded text-orange-700">
              {schedule.time}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
            <MapPin className="w-5 h-5 text-red-500" />
            <span className="bg-red-50 text-red-700 px-2 py-1 rounded font-medium">
              Room {schedule.room}
            </span>
          </div>
        </div>

        {/* Action buttons - only for admin */}
        {isAdmin && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => onEdit(schedule)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>

            <button
              onClick={() => onDelete(schedule._id)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
