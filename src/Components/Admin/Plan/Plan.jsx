
"use client";
import { useState, useEffect } from "react";
import PlanForm from "./PlanForm";
import PlanList from "./PlanList";

export default function Plan() {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🏋️ Membership Plans</h1>

        {role === 'admin' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {showForm ? "Hide Form" : "➕ Add Plan"}
          </button>
        )}
      </div>

      {role === 'admin' && showForm && <PlanForm />}
      <PlanList />
    </div>
  );
}
