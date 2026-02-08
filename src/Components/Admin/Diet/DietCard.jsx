
import React from 'react';
import { Users, Clock, CheckCircle, Star } from 'lucide-react';

const DietCard = ({ diet }) => {
  const userCount = diet.users ? diet.users.length : 0;
  const hasUsers = userCount > 0;
  
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 m-3 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        {hasUsers ? (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            Active
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            Pending
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Title section */}
        <div className="flex items-start justify-between mb-4">
          <h4 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200 pr-20">
            {diet.title}
          </h4>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {diet.description}
        </p>
        
        {/* Users section */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={16} className="text-blue-500" />
            <span className="font-medium text-sm">Assigned Users:</span>
          </div>
          
          <div className="flex-1">
            {hasUsers ? (
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {userCount} {userCount === 1 ? 'user' : 'users'}
                </span>
                <div className="text-sm text-gray-600 truncate">
                  {diet.users.map(user => user.name).join(', ')}
                </div>
              </div>
            ) : (
              <span className="text-gray-400 text-sm italic">No users assigned yet</span>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:shadow-md">
            View Details
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Edit
          </button>
          <button className="p-2 border border-gray-300 text-gray-400 hover:text-yellow-500 hover:border-yellow-300 rounded-lg transition-colors duration-200">
            <Star size={16} />
          </button>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-blue-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
export default DietCard;