
'use client';
import React from "react";

const AchievementsCard = ({ achievement, onEdit, onDelete }) => {
  const imageUrl = achievement.imageUrl
    ? `http://localhost:5000${achievement.imageUrl}`
    : null;

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200',
      'Sports': 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
      'Arts': 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200',
      'Technology': 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 border-indigo-200',
      'Leadership': 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200',
      'Community': 'bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800 border-pink-200',
      'Research': 'bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 border-teal-200'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelStyle = (level) => {
    const styles = {
      'Beginner': 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-emerald-200',
      'Intermediate': 'bg-gradient-to-r from-amber-400 to-amber-600 shadow-amber-200',
      'Advanced': 'bg-gradient-to-r from-orange-400 to-orange-600 shadow-orange-200',
      'Expert': 'bg-gradient-to-r from-red-400 to-red-600 shadow-red-200',
      'Master': 'bg-gradient-to-r from-purple-500 to-purple-700 shadow-purple-200'
    };
    return styles[level] || 'bg-gradient-to-r from-gray-400 to-gray-600 shadow-gray-200';
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden mb-8 transform hover:-translate-y-2">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-60"></div>
      
      <div className="relative flex flex-col lg:flex-row">
        {/* Enhanced Image Section */}
        <div className="relative lg:w-72 h-72 lg:h-auto overflow-hidden">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="Achievement"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">No Image</p>
              </div>
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Content Section */}
        <div className="flex-1 p-8 flex flex-col justify-between relative">
          <div>
            {/* Title and Level */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                {achievement.title}
              </h3>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg ${getLevelStyle(achievement.level)} transform group-hover:scale-105 transition-transform duration-300`}>
                ✨ {achievement.level}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-3">
              {achievement.description}
            </p>

            {/* Enhanced Tags and Info */}
            <div className="space-y-4">
              {/* Category Tag */}
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-xl text-sm font-medium border-2 ${getCategoryColor(achievement.category)} shadow-sm`}>
                  🏆 {achievement.category}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-blue-500">👤</span>
                  <span className="font-medium">Winner:</span>
                  <span className="text-gray-800">{achievement.winner}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-green-500">📅</span>
                  <span className="font-medium">Date:</span>
                  <span className="text-gray-800">{achievement.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-purple-500">🗓️</span>
                  <span className="font-medium">Year:</span>
                  <span className="text-gray-800">{achievement.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-4 mt-8 justify-end">
            <button
              onClick={() => onEdit(achievement)}
              className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <button
              onClick={() => onDelete(achievement._id)}
              className="group/btn relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsCard;