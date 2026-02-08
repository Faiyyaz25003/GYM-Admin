"use client";
import React, { useEffect, useState } from "react";

import Sidebar from "../Layout/Sidebar/Sidebar";
import Navbar from "../Layout/Navbar/Navbar";

import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import Trainee from "../Admin/Trainee/Trainee";
import Schedule from "../Admin/Schedule/Schedule";
import Plan from "../Admin/Plan/Plan";
import Member from "../Admin/Members/Member";
import ContactData from "../Admin/Contact/ContactData";
import UserDetails from "../Admin/UserDetails/UserDetails";
import Profile from "../Admin/Profile/Profile";
import Acheivements from "../Admin/Acheivements/Acheivements";
import DietManager from "../Admin/Diet/Diet";
import Calculator from "../Admin/Calculator/Calculator";
import Notification from "../Admin/Notification/Notification";
import Expire from "../Admin/Expire/Expire";
import DietReference from "../Admin/DietReference/DietReference";
import ExcersizeReference from "../Admin/ExcersizeReference/ExcersizeReference";
import Attandence from "../Admin/Attandence/Attandence";
import AttendanceReport from "../Admin/Attandence/AttendanceReport";
import GymAdvertisement from "../Admin/Advertisement/Advertisement";

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const user = { name: "Admin", role: "admin" };

  const renderPage = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard />;
      case "members":
        return <Member />;
      case "trainers":
        return <Trainee />;
      case "schedule":
        return <Schedule />;
      case "plans":
        return <Plan />;
      case "userDetails":
        return <UserDetails />;
      case "contactData":
        return <ContactData />;
      case "diet":
        return <DietManager />;
      case "calculator":
        return <Calculator />;
      case "notification":
        return <Notification />;
      case "expire":
        return <Expire />;
      case "achievements":
        return <Acheivements />;
      case "dietReference":
        return <DietReference />;
      case "excersizeReference":
        return <ExcersizeReference />;
      case "attandence":
        return <Attandence />;
      case "attendanceReport":
        return <AttendanceReport />;
      case "admin-profile":
        return <Profile />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Floating Ad */}
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 z-50">
        <GymAdvertisement />
      </div>

      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden w-full transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar
          user={user}
          setCurrentView={setCurrentView}
          toggleSidebar={toggleSidebar}
        />

        {/* Page Render */}
        <main className="flex-1 md:ml-[260px] overflow-y-auto bg-gray-100">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
