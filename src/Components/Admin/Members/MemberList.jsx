
// components/Members/MemberList.jsx
'use client';
import React from 'react';
import MemberCard from './MemberCard';

const MemberList = ({ members, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {members.map((member) => (
        <MemberCard
          key={member._id}
          member={member}
          onEdit={() => onEdit(member)}
          onDelete={() => onDelete(member._id)}
        />
      ))}
    </div>
  );
};

export default MemberList;

