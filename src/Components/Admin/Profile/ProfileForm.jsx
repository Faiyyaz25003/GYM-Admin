

'use client';
import { useState, useEffect } from 'react';
import {
  Save, X, Upload, User, Mail, Phone, Calendar, MapPin, Building2,
  Flag, Briefcase, HeartPulse, Users, ShieldAlert, UserPlus, Camera
} from 'lucide-react';

const ProfileForm = ({ trainee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', alternatePhone: '', dob: '', gender: '', role: '',
    occupation: '', maritalStatus: '', bloodGroup: '', nationality: '',
    emergencyContactName: '', emergencyContactNumber: '',
    address: '', country: '', state: '', city: '', profilePic: ''
  });

  useEffect(() => {
    if (trainee) {
      setFormData({
        ...formData,
        ...trainee,
        dob: trainee.dob ? new Date(trainee.dob).toISOString().split('T')[0] : ''
      });
    }
  }, [trainee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const required = ['name', 'email', 'phone', 'dob', 'gender', 'role', 'address'];
    const isValid = required.every((f) => formData[f]);
    if (isValid) {
      onSave(formData);
      // Note: localStorage not used in artifacts - would store in parent component
    } else {
      alert('Please fill all required fields.');
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', icon: <User className="w-5 h-5" />, required: true },
    { name: 'email', label: 'Email', icon: <Mail className="w-5 h-5" />, type: 'email', required: true },
    { name: 'phone', label: 'Mobile Number', icon: <Phone className="w-5 h-5" />, type: 'tel', required: true },
    { name: 'alternatePhone', label: 'Alternate Mobile Number', icon: <Phone className="w-5 h-5" />, type: 'tel' },
    { name: 'dob', label: 'Date of Birth', icon: <Calendar className="w-5 h-5" />, type: 'date', required: true },
    { name: 'gender', label: 'Gender', icon: <Users className="w-5 h-5" />, type: 'select', options: ['Male', 'Female', 'Other'], required: true },
    { name: 'role', label: 'Role', icon: <UserPlus className="w-5 h-5" />, type: 'select', options: ['admin', 'user'], required: true },
    { name: 'occupation', label: 'Occupation', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'maritalStatus', label: 'Marital Status', icon: <HeartPulse className="w-5 h-5" />, type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'] },
    { name: 'bloodGroup', label: 'Blood Group', icon: <ShieldAlert className="w-5 h-5" /> },
    { name: 'nationality', label: 'Nationality', icon: <Flag className="w-5 h-5" /> },
    { name: 'emergencyContactName', label: 'Emergency Contact Name', icon: <User className="w-5 h-5" /> },
    { name: 'emergencyContactNumber', label: 'Emergency Contact Number', icon: <Phone className="w-5 h-5" />, type: 'tel' },
    { name: 'address', label: 'Address', icon: <MapPin className="w-5 h-5" />, required: true },
    { name: 'city', label: 'City', icon: <Building2 className="w-5 h-5" /> },
    { name: 'state', label: 'State', icon: <Building2 className="w-5 h-5" /> },
    { name: 'country', label: 'Country', icon: <Flag className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">
              {trainee ? '✨ Edit Profile' : '🚀 Create New Profile'}
            </h2>
            <p className="text-blue-100 mt-2">
              {trainee ? 'Update your information below' : 'Fill in the details to create a new profile'}
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center">
                  <label className="text-lg font-semibold text-gray-700 mb-4 block">
                    Profile Picture
                  </label>
                  <div className="relative group">
                    <div className="w-40 h-40 mx-auto border-4 border-dashed border-gray-300 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg">
                      {formData.profilePic ? (
                        <img 
                          src={formData.profilePic} 
                          className="w-full h-full object-cover" 
                          alt="Profile" 
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Upload Photo</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map(({ name, label, icon, type = 'text', options, required }) => (
                    <div key={name} className="group">
                      <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
                        <span className="text-blue-600 mr-2">{icon}</span>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {type === 'select' ? (
                        <select
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white hover:border-gray-300"
                        >
                          <option value="">Select {label}</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={type}
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white hover:border-gray-300"
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold"
                  >
                    <Save className="w-5 h-5 mr-2" /> 
                    {trainee ? 'Update Profile' : 'Save Profile'}
                  </button>
                  <button
                    onClick={onCancel}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" /> 
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;