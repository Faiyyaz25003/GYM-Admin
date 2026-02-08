
'use client';
import React, { useState } from 'react';
import {
  LogOut, User, Users, Calendar, ClipboardList,
  BarChart3, Dumbbell, Phone, Info, UserCircle,
  Trophy, Utensils, BookOpen, ChevronDown, ChevronUp, X
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, user, isSidebarOpen, closeSidebar }) => {
  const [isDietOpen, setIsDietOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'contactData', label: 'Visitor Message', icon: <Phone size={18} /> },
    { id: 'userDetails', label: 'User Details', icon: <Users size={18} /> },
    { id: 'trainers', label: 'Trainers', icon: <Dumbbell size={18} /> },
    { id: 'members', label: 'Members', icon: <User size={18} /> },
    { id: 'expire', label: 'Expire Membership', icon: <User size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'plans', label: 'My Plan', icon: <ClipboardList size={18} /> },
    {
      id: 'dietDropdown',
      label: 'Diet',
      icon: <Utensils size={18} />,
      isDropdown: true,
      children: [
        { id: 'diet', label: 'Diet', icon: <ClipboardList size={16} /> },
        { id: 'dietReference', label: 'Diet Reference', icon: <BookOpen size={16} /> },
      ],
    },
    {
      id: 'attendanceDropdown',
      label: 'Attandence',
      icon: <UserCircle size={18} />,
      isDropdown: true,
      children: [
        { id: 'attandence', label: 'Mark Attendance', icon: <UserCircle size={16} /> },
        { id: 'attendanceReport', label: 'Attendance Report', icon: <ClipboardList size={16} /> },
      ],
    },
    { id: 'excersizeReference', label: 'Excersize Reference', icon: <BookOpen size={18} /> },
    { id: 'admin-profile', label: 'Admin Profile', icon: <UserCircle size={18} /> },
  ];

  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'trainers', label: 'Trainers', icon: <Dumbbell size={18} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'plans', label: 'My Plan', icon: <ClipboardList size={18} /> },
    { id: 'diet', label: 'Diet', icon: <ClipboardList size={18} /> },
    { id: 'dietReference', label: 'Diet Reference', icon: <BookOpen size={18} /> },
    { id: 'excersizeReference', label: 'Excersize Reference', icon: <BookOpen size={18} /> },
    { id: 'attandence', label: 'Mark Attendance', icon: <UserCircle size={16} /> },
    { id: 'user-profile', label: 'User Profile', icon: <UserCircle size={18} /> },
  ];

  const menuToShow = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      {/* Header with Close Button (mobile only) */}
      <div className="flex justify-between items-center p-3 border-b border-white/10 bg-gradient-to-r from-[#0f172a] to-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="w-[42px] h-[42px] rounded-lg bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🏋️‍♂️</span>
          </div>
          <h1 className="text-lg font-bold text-white">FitTrack</h1>
        </div>
        <button
          className="text-white md:hidden hover:text-red-400 transition"
          onClick={closeSidebar}
        >
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Menu */}
      <nav className="p-3 flex flex-col gap-1 overflow-y-auto max-h-[calc(100%-60px)]">
        {menuToShow.map((item) =>
          item.isDropdown && user?.role === 'admin' ? (
            <div key={item.id} className="flex flex-col">
              <button
                onClick={() =>
                  item.id === 'dietDropdown'
                    ? setIsDietOpen(!isDietOpen)
                    : setIsAttendanceOpen(!isAttendanceOpen)
                }
                className={`flex items-center justify-between gap-2 p-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${(item.id === 'dietDropdown' && isDietOpen) || (item.id === 'attendanceDropdown' && isAttendanceOpen)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-inner'
                    : 'text-purple-100 hover:bg-purple-700/20 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {(item.id === 'dietDropdown' ? isDietOpen : isAttendanceOpen)
                  ? <ChevronUp size={16} />
                  : <ChevronDown size={16} />}
              </button>
              {(item.id === 'dietDropdown' ? isDietOpen : isAttendanceOpen) && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setCurrentView(child.id);
                        closeSidebar();
                      }}
                      className={`flex items-center gap-2 p-2 pl-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${currentView === child.id
                          ? 'bg-purple-600 text-white shadow-inner'
                          : 'text-purple-100 hover:bg-purple-600/20 hover:text-white'}`}
                    >
                      {child.icon}
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                closeSidebar();
              }}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${currentView === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-inner'
                  : 'text-purple-100 hover:bg-purple-700/20 hover:text-white'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
