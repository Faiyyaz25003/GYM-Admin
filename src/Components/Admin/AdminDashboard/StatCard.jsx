
// import React, { useState, useEffect } from 'react';
// import {TrendingUp} from 'lucide-react';

// // Enhanced StatCard Component
// function StatCard({ title, value, icon, color, trend, trendValue }) {
//   return (
//     <div className={`relative overflow-hidden rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 ${color} group`}>
//       <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10 transition-transform duration-300 group-hover:scale-150"></div>
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div className="text-white text-opacity-80 text-sm font-medium">{title}</div>
//           <div className="text-white text-opacity-90 text-2xl group-hover:scale-110 transition-transform duration-300">
//             {icon}
//           </div>
//         </div>
//         <div className="text-3xl font-bold text-white mb-2">{value}</div>
//         {trend && (
//           <div className="flex items-center text-white text-opacity-80 text-sm">
//             <TrendingUp className="w-4 h-4 mr-1" />
//             <span>{trendValue}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default StatCard;


'use client';
import React from 'react';
import { TrendingUp } from 'lucide-react';

// StatCard with white circle fully down outside
function StatCard({ title, value, icon, color, trend, trendValue }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 ${color} group`}
    >
      {/* Circle moved fully to the bottom outside */}
      <div className="absolute -bottom-8 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-x-10 transition-transform duration-300 group-hover:scale-150"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-white text-opacity-80 text-sm font-medium">{title}</div>
          <div className="text-white text-opacity-90 text-2xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        {trend && (
          <div className="flex items-center text-white text-opacity-80 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
