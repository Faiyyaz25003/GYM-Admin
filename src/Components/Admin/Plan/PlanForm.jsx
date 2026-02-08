
'use client';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlanForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    type: "",
    features: [],
    description: "",
  });
  const [featureInput, setFeatureInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeatureAdd = (e) => {
    e.preventDefault();
    if (featureInput.trim() !== "") {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/plans", form);
      toast.success("Plan created successfully");
      setForm({
        name: "",
        price: "",
        duration: "",
        type: "",
        features: [],
        description: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create plan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow space-y-5 border">
      <h2 className="text-xl font-bold mb-4">📝 Create a Gym Membership Plan</h2>

      <input name="name" type="text" value={form.name} onChange={handleChange}
        placeholder="Plan Name" className="w-full border p-2 rounded-md" required />

      <input name="price" type="number" value={form.price} onChange={handleChange}
        placeholder="Price" className="w-full border p-2 rounded-md" required />

      <input name="duration" type="text" value={form.duration} onChange={handleChange}
        placeholder="Duration" className="w-full border p-2 rounded-md" required />

      <select name="type" value={form.type} onChange={handleChange}
        className="w-full border p-2 rounded-md" required>
        <option value="">Select type</option>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
      </select>

      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Add facility"
            className="flex-1 border p-2 rounded-md"
          />
          <button onClick={handleFeatureAdd} className="bg-blue-500 text-white px-4 rounded-md">Add</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.features.map((item, idx) => (
            <span key={idx} className="bg-gray-200 text-sm px-3 py-1 rounded-full">{item}</span>
          ))}
        </div>
      </div>

      <textarea name="description" value={form.description} onChange={handleChange}
        placeholder="Description" className="w-full border p-2 rounded-md" />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">
        ✅ Save Membership Plan
      </button>
    </form>
  );
}
