
'use client';
import React, { useEffect, useState } from "react";
import AchievementsCard from "./AcheivementsCard";
import { toast } from "react-toastify";

const AchievementsList = ({ newEntry, onEdit }) => {
  const [achievements, setAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch achievements
  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/achievements");
      if (!res.ok) throw new Error("Failed to fetch achievements");
      const data = await res.json();
      setAchievements(data);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load achievements. Please try again later.");
      toast.error("Error fetching achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Update on new entry
  useEffect(() => {
    if (newEntry) {
      setAchievements(prev => {
        const exists = prev.find(item => item._id === newEntry._id);
        if (exists) {
          return prev.map(item => item._id === newEntry._id ? newEntry : item);
        } else {
          return [newEntry, ...prev];
        }
      });
    }
  }, [newEntry]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/achievements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setAchievements(prev => prev.filter(item => item._id !== id));
      toast.success("Achievement deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete the achievement.");
    }
  };

  // Filter logic
  const filteredAchievements = achievements.filter(ach => {
    const query = searchTerm.toLowerCase();
    return (
      ach.title?.toLowerCase().includes(query) ||
      ach.description?.toLowerCase().includes(query) ||
      ach.category?.toLowerCase().includes(query) ||
      ach.level?.toLowerCase().includes(query) ||
      ach.winner?.toLowerCase().includes(query) ||
      ach.year?.toString().includes(query)
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search achievements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading achievements...</p>}

      {/* Error */}
      {error && !loading && <p className="text-center text-red-500">{error}</p>}

      {/* List */}
      {!loading && filteredAchievements.length > 0 ? (
        filteredAchievements.map(achievement => (
          <AchievementsCard
            key={achievement._id}
            achievement={achievement}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        !loading && <p className="text-center text-gray-500">No achievements found.</p>
      )}
    </div>
  );
};

export default AchievementsList;
