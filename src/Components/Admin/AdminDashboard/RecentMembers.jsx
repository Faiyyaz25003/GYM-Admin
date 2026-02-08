
'use client';
import React, { useEffect, useState } from 'react';
import { Users, ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from 'axios';

export default function RecentMembers() {
  const [recentMembers, setRecentMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchRecentMembers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/members/recent`);
        const enriched = res.data.map((m) => ({
          ...m,
          plan: m.plan || 'Basic',
          status: 'Active',
        }));
        setRecentMembers(enriched);
      } catch (err) {
        console.error('Failed to fetch recent members:', err);
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMembers();
  }, [BASE_URL]);

  const totalPages = Math.ceil(recentMembers.length / pageSize);
  const currentMembers = recentMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getAvatar = (name) => {
    const parts = name?.split(' ');
    return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status) =>
    status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';

  const MembersList = ({ data }) => (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm md:text-base">No new members in the last 3 days.</p>
      ) : (
        data.map((member) => (
          <div
            key={member._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 gap-2"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getAvatar(member.name)}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm md:text-base">{member.name}</p>
                <p className="text-xs text-gray-500 md:text-sm">
                  Joined: {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-1 sm:mt-0">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(member.plan)}`}
              >
                {member.plan}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}
              >
                {member.status}
              </span>
            </div>
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
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Recent Members
            </h2>
            {!loading && (
              <span className="ml-3 text-xs sm:text-sm text-gray-500">
                Total: {recentMembers.length}
              </span>
            )}
          </div>

          <button
            onClick={() => setViewAllOpen(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          <MembersList data={currentMembers} />
        )}

        {!loading && totalPages > 1 && (
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

        {error && (
          <p className="text-xs text-yellow-600 mt-4 italic">{error}</p>
        )}
      </div>

      {viewAllOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative animate-slideIn">
            <button
              onClick={() => setViewAllOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-2 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              All Recent Members
            </h2>
            {!loading && (
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Total Members: {recentMembers.length}
              </p>
            )}

            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <MembersList data={recentMembers} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
