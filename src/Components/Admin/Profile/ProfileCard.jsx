'use client';
import React, { useEffect, useState } from 'react';
import {
  Mail, Phone, MapPin, Calendar, Edit, Trash2, Users, UserPlus, Briefcase,
  HeartPulse, ShieldAlert, Flag, User, AlertCircle, Star, Award, Clock
} from 'lucide-react';

const ProfileCard = ({ trainee: initialTrainee, onEdit, onDelete }) => {
  const [trainee, setTrainee] = useState(initialTrainee);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // In a real app, this would load from localStorage
    // For demo purposes, we'll use the provided trainee data
    setTrainee(initialTrainee);
  }, [initialTrainee]);

  const handleEdit = () => {
    onEdit(trainee);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(trainee._id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const profileData = [
    { label: 'Email', value: trainee.email, icon: <Mail className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Phone', value: trainee.phone, icon: <Phone className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Alternate Phone', value: trainee.alternatePhone, icon: <Phone className="w-5 h-5" />, color: 'text-green-500' },
    { label: 'Date of Birth', value: new Date(trainee.dob).toLocaleDateString(), icon: <Calendar className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Gender', value: trainee.gender, icon: <Users className="w-5 h-5" />, color: 'text-pink-600' },
    { label: 'Role', value: trainee.role, icon: <UserPlus className="w-5 h-5" />, color: 'text-indigo-600' },
    { label: 'Occupation', value: trainee.occupation, icon: <Briefcase className="w-5 h-5" />, color: 'text-orange-600' },
    { label: 'Marital Status', value: trainee.maritalStatus, icon: <HeartPulse className="w-5 h-5" />, color: 'text-red-600' },
    { label: 'Blood Group', value: trainee.bloodGroup, icon: <ShieldAlert className="w-5 h-5" />, color: 'text-red-500' },
    { label: 'Nationality', value: trainee.nationality, icon: <Flag className="w-5 h-5" />, color: 'text-blue-500' },
    { label: 'Emergency Contact', value: trainee.emergencyContactName, icon: <User className="w-5 h-5" />, color: 'text-gray-600' },
    { label: 'Emergency Number', value: trainee.emergencyContactNumber, icon: <Phone className="w-5 h-5" />, color: 'text-gray-600' },
  ];

  const addressData = [
    { label: 'Address', value: trainee.address, icon: <MapPin className="w-5 h-5" /> },
    { label: 'City', value: trainee.city, icon: <MapPin className="w-4 h-4" /> },
    { label: 'State', value: trainee.state, icon: <MapPin className="w-4 h-4" /> },
    { label: 'Country', value: trainee.country, icon: <Flag className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100" style={{width: '800px'}}>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <h2 className="text-2xl font-bold text-white">Profile Details</h2>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 mb-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-6xl font-bold overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  {trainee.profilePic ? (
                    <img
                      src={trainee.profilePic}
                      alt={trainee.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-2">{trainee.name?.charAt(0).toUpperCase()}</div>
                      <div className="text-xs opacity-80">No Photo</div>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{trainee.name}</h3>
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold capitalize">
                    {trainee.role}
                  </span>
                  {trainee.occupation && (
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {trainee.occupation}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{trainee.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{trainee.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-600" />
                  Personal Information
                </h4>
                <div className="space-y-3">
                  {profileData.slice(0, 6).map((item) => (
                    item.value && (
                      <div key={item.label} className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                        <span className={item.color}>{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-500">{item.label}</p>
                          <p className="text-gray-800 capitalize">{item.value}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <ShieldAlert className="w-6 h-6 mr-2 text-purple-600" />
                  Additional Details
                </h4>
                <div className="space-y-3">
                  {profileData.slice(6).map((item) => (
                    item.value && (
                      <div key={item.label} className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                        <span className={item.color}>{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-500">{item.label}</p>
                          <p className="text-gray-800 capitalize">{item.value}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-green-600" />
                Address Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addressData.map((item) => (
                  item.value && (
                    <div key={item.label} className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                      <span className="text-green-600">{item.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                        <p className="text-gray-800 capitalize">{item.value}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleEdit}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold"
              >
                <Edit className="w-5 h-5 mr-2" /> Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className={`flex-1 sm:flex-none px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold ${
                  showDeleteConfirm 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                }`}
              >
                <Trash2 className="w-5 h-5 mr-2" /> 
                {showDeleteConfirm ? 'Confirm Delete' : 'Delete Profile'}
              </button>
              {showDeleteConfirm && (
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;