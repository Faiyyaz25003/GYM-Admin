
'use client';
import { useState, useEffect } from "react";
import { Save, X, Upload } from 'lucide-react';

const TraineeForm = ({ trainee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    course: '',
    joinDate: new Date().toISOString().split('T')[0],
    profilePic: ''
  });

  useEffect(() => {
    if (trainee) {
      setFormData({
        ...trainee,
        joinDate: new Date(trainee.joinDate).toISOString().split('T')[0]
      });
    }
  }, [trainee]);

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.course
    ) {
      onSave(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        course: '',
        joinDate: new Date().toISOString().split('T')[0],
        profilePic: ''
      });
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePic: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {trainee ? 'Edit Trainee' : 'Add New Trainee'}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center md:w-1/3">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="w-40 h-40 rounded-full border flex items-center justify-center overflow-hidden bg-gray-50">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <Upload className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-3 text-sm"
          />
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Updated Plan Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialist
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Trainner</option>
              <option value="Weight Training">Weight Training</option>
              <option value="Yoga">Yoga</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Cardio">Cardio</option>
              <option value="HIIT">HIIT</option>
              <option value="Zumba">Zumba</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <Save className="w-4 h-4 mr-2" />
              {trainee ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeForm;
