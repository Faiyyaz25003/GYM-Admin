
'use client';
import { useState } from "react";
import TraineeCard from "./TraineeCard";
import { User } from 'lucide-react';

const TraineeList = ({ trainees, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const filteredTrainees = trainees.filter(trainee => {
    const matchesSearch = trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trainee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === '' || trainee.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const courses = [...new Set(trainees.map(trainee => trainee.course))];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search trainees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainees.map(trainee => (
          <TraineeCard
            key={trainee._id} // ✅ FIXED key
            trainee={trainee}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {filteredTrainees.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No trainees found</p>
        </div>
      )}
    </div>
  );
};

export default TraineeList;
