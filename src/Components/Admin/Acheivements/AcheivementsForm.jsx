

'use client';
import React, { useState, useEffect } from "react";

const AchievementsForm = ({ onCreated, onUpdated, editingAchievement }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    level: "",
    winner: "",
    year: "",
    image: null,
  });

  useEffect(() => {
    if (editingAchievement) {
      setForm({
        title: editingAchievement.title || "",
        description: editingAchievement.description || "",
        date: editingAchievement.date || "",
        category: editingAchievement.category || "",
        level: editingAchievement.level || "",
        winner: editingAchievement.winner || "",
        year: editingAchievement.year || "",
        image: null,
      });
    } else {
      setForm({
        title: "",
        description: "",
        date: "",
        category: "",
        level: "",
        winner: "",
        year: "",
        image: null,
      });
    }
  }, [editingAchievement]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      let res;
      if (editingAchievement) {
        res = await fetch(`http://localhost:5000/api/achievements/${editingAchievement._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("http://localhost:5000/api/achievements", {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();

      if (editingAchievement) {
        onUpdated(data);
      } else {
        onCreated(data);
      }

      setForm({
        title: "",
        description: "",
        date: "",
        category: "",
        level: "",
        winner: "",
        year: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit achievement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      ></textarea>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="level"
        placeholder="Level"
        value={form.level}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="winner"
        placeholder="Winner"
        value={form.winner}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {editingAchievement ? "Update Achievement" : "Create Achievement"}
      </button>
    </form>
  );
};

export default AchievementsForm;
