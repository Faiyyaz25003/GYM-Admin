
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell, User, Settings, LogOut, ChevronDown, Clock, X, Menu,
  CheckCircle, AlertCircle, AlertTriangle, Info, Calculator
} from 'lucide-react';

export default function Navbar({ setCurrentView, toggleSidebar }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const dropdownRef = useRef();
  const notificationRef = useRef();

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) setUserName(name);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications');
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await Promise.all(
        notifications.filter(n => !n.isRead).map(n =>
          fetch(`http://localhost:5000/api/notifications/${n._id}/read`, { method: 'PUT' })
        )
      );
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleSeeAll = () => {
    setCurrentView('notification');
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white md:ml-[258px] px-4 py-4 flex justify-between items-center shadow sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Hamburger toggle button */}
        <button onClick={toggleSidebar} className="md:hidden text-white hover:text-purple-300">
          <Menu className="w-6 h-6" />
        </button>
        {/* Welcome message */}
        <span className="hidden sm:inline text-sm font-medium">
         <span className=" text-2xl"> Welcome, </span> <span className="text-purple-400 text-2xl">{userName || 'User'}</span>
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        <div
          className="relative"
          ref={notificationRef}
          onMouseEnter={() => setIsNotificationOpen(true)}
          onMouseLeave={() => setIsNotificationOpen(false)}
        >
          <button className="p-2 rounded hover:bg-gray-700 transition relative" title="Notifications">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded shadow-lg border border-gray-700 z-50">
              <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <span className="font-semibold">Notifications</span>
                <div className="flex gap-2">
                  <button onClick={handleMarkAllRead} className="text-xs text-green-400 hover:underline">Mark all read</button>
                  <button onClick={handleSeeAll} className="text-xs text-blue-400 hover:underline">See all</button>
                  <button onClick={() => setIsNotificationOpen(false)} className="text-gray-400 hover:text-white transition"><X className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification._id} className="flex items-start gap-2 p-3 border-b border-gray-700 hover:bg-gray-800 transition">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-400">{notification.message}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{new Date(notification.time).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => setCurrentView('settings')} className="p-2 rounded hover:bg-gray-700 transition" title="Settings">
          <Settings className="w-5 h-5" />
        </button>

        <button onClick={() => setCurrentView('calculator')} className="p-2 rounded hover:bg-gray-700 transition" title="Calculator">
          <Calculator className="w-5 h-5" />
        </button>

        {/* Profile dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={() => setIsProfileDropdownOpen(true)}
          onMouseLeave={() => setIsProfileDropdownOpen(false)}
        >
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition">
            <User className="w-4 h-4" />
            <span className="hidden sm:block text-sm font-medium">{userName || 'Admin'}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded shadow-lg z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition" onClick={() => { setCurrentView('profile'); setIsProfileDropdownOpen(false); }}>My Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition" onClick={() => { setCurrentView('settings'); setIsProfileDropdownOpen(false); }}>Settings</button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-500 transition" onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}



