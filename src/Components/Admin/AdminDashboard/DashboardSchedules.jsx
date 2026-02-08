
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function DashboardSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const pageSize = 2;

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/schedules`);
        setSchedules(res.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    fetchSchedules();
  }, [BASE_URL]);

  const totalPages = Math.ceil(schedules.length / pageSize);
  const currentSchedules = schedules.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getDayName = (daysArray) => {
    if (!daysArray || daysArray.length === 0) return 'Day N/A';
    return daysArray.join(', ');
  };

  const ScheduleList = ({ data }) => (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm md:text-base">No schedules found.</p>
      ) : (
        data.map((schedule) => (
          <div
            key={schedule._id}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div>
                <h3 className="font-bold text-gray-800 text-sm md:text-lg">
                  {schedule.className || schedule.class || schedule.course || 'Class Name Missing'}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Trainer: {schedule.trainerName || schedule.trainer || 'N/A'}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs md:text-sm font-semibold text-gray-700">
                  {getDayName(schedule.days)}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {schedule.startTime && schedule.endTime
                    ? `${schedule.startTime} - ${schedule.endTime}`
                    : schedule.time || 'Time N/A'}
                </p>
              </div>
            </div>
            {schedule.location && (
              <p className="text-xs md:text-sm text-gray-500">Location: {schedule.location}</p>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="relative w-full">
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border border-gray-100 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Schedules
            </h2>
            {schedules.length > 0 && (
              <span className="ml-3 text-xs sm:text-sm text-gray-500">
                Total: {schedules.length}
              </span>
            )}
          </div>

          {schedules.length > 0 && (
            <button
              onClick={() => setViewAllOpen(true)}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
            >
              View All
            </button>
          )}
        </div>

        <ScheduleList data={currentSchedules} />

        {totalPages > 1 && (
          <div className="flex justify-center sm:justify-end mt-4 sm:mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-1.5 border rounded text-xs sm:text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </button>
            <span className="text-xs sm:text-sm text-gray-700 self-center px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-1.5 border rounded text-xs sm:text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>

      {viewAllOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative animate-slideIn">
            <button
              onClick={() => setViewAllOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              All Weekly Schedules
            </h2>
            {schedules.length > 0 && (
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Total Schedules: {schedules.length}
              </p>
            )}

            <ScheduleList data={schedules} />
          </div>
        </div>
      )}
    </div>
  );
}
