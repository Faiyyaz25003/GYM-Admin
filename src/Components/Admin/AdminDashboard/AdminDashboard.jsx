
'use client';
import {
  Users, UserCheck, Dumbbell, Wallet, ClipboardList
} from 'lucide-react';
import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import RecentMembers from './RecentMembers';
import DashboardSchedules from './DashboardSchedules';

import axios from 'axios';

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeTrainers, setActiveTrainers] = useState(0);
  const [totalPlans, setTotalPlans] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeUserChartData, setActiveUserChartData] = useState([]);

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // Live time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dashboard data fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, activeUsersRes, trainersRes, plansRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/auth/users`),
          axios.get(`${BASE_URL}/api/auth/active-users`),
          axios.get(`${BASE_URL}/api/trainees/count`),
          axios.get(`${BASE_URL}/api/plans/count`)
        ]);

        const currentTimeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setActiveUserChartData(prev => [
          ...prev.slice(-9),
          { time: currentTimeLabel, count: activeUsersRes.data.count || 0 }
        ]);

        setTotalMembers(usersRes.data.length);
        setActiveUsers(activeUsersRes.data.count || 0);
        setActiveTrainers(trainersRes.data.count || 0);
        setTotalPlans(plansRes.data.count || 0);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time activity & inactivity
  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   const setActiveStatus = async (status) => {
  //     try {
  //       await axios.post(`${BASE_URL}/api/auth/active`, { active: status, token });
  //     } catch (err) {
  //       console.error('Error updating user active status:', err);
  //     }
  //   };

  //   const handleActive = () => {
  //     setActiveStatus(true);
  //   };

  //   const handleInactive = () => {
  //     setActiveStatus(false);
  //   };

  //   // Active events
  //   window.addEventListener('mousemove', handleActive);
  //   window.addEventListener('keydown', handleActive);
  //   window.addEventListener('click', handleActive);

  //   // Inactive events
  //   window.addEventListener('blur', handleInactive);
  //   window.addEventListener('mouseleave', handleInactive);
  //   document.addEventListener('visibilitychange', () => {
  //     if (document.visibilityState === 'hidden') {
  //       handleInactive();
  //     }
  //   });

  //   // Tab close - use sendBeacon
  //   window.addEventListener('beforeunload', () => {
  //     if (!token) return;
  //     const payload = JSON.stringify({ active: false, token });
  //     navigator.sendBeacon(`${BASE_URL}/api/auth/active`, new Blob([payload], {
  //       type: 'application/json'
  //     }));
  //   });

  //   // Start as active
  //   handleActive();

  //   return () => {
  //     window.removeEventListener('mousemove', handleActive);
  //     window.removeEventListener('keydown', handleActive);
  //     window.removeEventListener('click', handleActive);
  //     window.removeEventListener('blur', handleInactive);
  //     window.removeEventListener('mouseleave', handleInactive);
  //     document.removeEventListener('visibilitychange', handleInactive);
  //     window.removeEventListener('beforeunload', handleInactive);
  //   };
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4 md:px-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Gym Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your gym today.</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-lg font-semibold text-gray-800">{currentTime.toLocaleTimeString()}</p>
          <p className="text-sm text-gray-600">{currentTime.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Members" icon={<Users />} value={totalMembers.toString()} color="bg-gradient-to-br from-blue-500 to-blue-600" />
        <StatCard title="Active Users" icon={<UserCheck />} value={activeUsers.toString()} color="bg-gradient-to-br from-green-500 to-green-600" />
        <StatCard title="Active Trainers" icon={<Dumbbell />} value={activeTrainers.toString()} color="bg-gradient-to-br from-purple-500 to-purple-600" />
        <StatCard title="Total Plans" icon={<ClipboardList />} value={totalPlans.toString()} color="bg-gradient-to-br from-orange-500 to-orange-600" />
        <StatCard title="Monthly Revenue" icon={<Wallet />} value="₹2,45,000" color="bg-gradient-to-br from-teal-500 to-teal-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentMembers />
        <DashboardSchedules />
      </div>


    </div>
  );
}
