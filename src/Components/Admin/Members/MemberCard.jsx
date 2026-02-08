
import React from 'react';
import {
  Pencil,
  Trash,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  UserCircle2,
  Target,
} from 'lucide-react';

const MemberCard = ({ member, onEdit, onDelete }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-auto border border-gray-200 hover:shadow-2xl transition-all duration-300">
      
      {/* Profile Picture or Initial */}
      <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-3 flex items-center justify-center text-white font-bold text-3xl bg-gradient-to-br from-blue-500 to-purple-600">
        {member.profilePic ? (
          <img
            src={member.profilePic}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          member.name?.charAt(0).toUpperCase() || 'U'
        )}
      </div>

      {/* Name & Plan */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <UserCircle2 size={20} className="text-purple-500" />
          {member.name}
        </h2>
        <p className="mt-1 inline-block text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium shadow-sm">
          {member.plan}
        </p>
      </div>

      {/* Member Info */}
      <div className="text-sm text-gray-700 mt-4 space-y-2 border-t pt-4">
        <p className="flex items-center gap-2">
          <Mail size={16} className="text-purple-500" />
          <span className="truncate">{member.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} className="text-purple-500" />
          {member.phone}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-purple-500" />
          <span className="truncate">{member.address}</span>
        </p>
         {/* Goal Field (NEW) */}
        {member.goal && (
          <p className="flex items-center gap-2">
            <Target size={16} className="text-blue-600" />
            Goal: <span className="font-medium">{member.goal}</span>
          </p>
        )}
      </div>
        <p className="flex items-center gap-2">
          <CalendarDays size={16} className="text-green-600" />
          Joined: <span className="font-medium">{new Date(member.joinDate).toLocaleDateString()}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={16} className="text-red-600" />
          Ends: <span className="font-medium">{new Date(member.endDate).toLocaleDateString()}</span>
        </p>

        {/* Goal Field (NEW)
        {member.goal && (
          <p className="flex items-center gap-2">
            <Target size={16} className="text-blue-600" />
            Goal: <span className="font-medium">{member.goal}</span>
          </p>
        )}
      </div> */}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          <Pencil size={16} /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
        >
          <Trash size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
