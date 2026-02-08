
'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, Trash2, Eye } from 'lucide-react';

const getIcon = (type) => {
  switch (type) {
    case 'success': return <CheckCircle className="w-6 h-6 text-green-600" />;
    case 'error': return <AlertCircle className="w-6 h-6 text-red-600" />;
    case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
    default: return <Info className="w-6 h-6 text-blue-600" />;
  }
};

const getBgColor = (type, isRead) => {
  let base = isRead ? 'opacity-60' : '';
  switch (type) {
    case 'success': return `bg-green-50 border-green-300 ${base}`;
    case 'error': return `bg-red-50 border-red-300 ${base}`;
    case 'warning': return `bg-yellow-50 border-yellow-300 ${base}`;
    case 'info': return `bg-blue-50 border-blue-300 ${base}`;
    default: return `bg-gray-50 border-gray-300 ${base}`;
  }
};

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState('');

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications');
      const data = await res.json();
      const role = localStorage.getItem('role') || 'user';
      setUserRole(role);
      const filteredNotifications = role === 'admin'
        ? data
        : data.filter((n) => n.recipientRole === 'all');
      setNotifications(filteredNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, { method: 'DELETE' });
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(notifications.map((n) => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#f8f9fc] to-[#e2e8f0] rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        🔔 Notifications
      </h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600 text-sm sm:text-base">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl shadow-sm hover:shadow-md border-l-4 transition-shadow duration-300 ${getBgColor(n.type, n.isRead)}`}
            >
              <div className="flex items-center gap-3">
                {getIcon(n.type)}
                {!n.isRead && (
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </div>
              <div className="flex-1 text-gray-800">
                <p className="font-semibold text-base sm:text-lg">{n.title}</p>
                <p className="text-sm sm:text-base mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(n.time).toLocaleString()}</p>
              </div>
              {userRole === 'admin' && (
                <div className="flex items-center gap-2 sm:flex-col sm:gap-2">
                  {!n.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(n._id)}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-200"
                      title="Mark as read"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
