import React from 'react';
import ScheduleCard from './ScheduleCard';

export default function ScheduleList({ schedules, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {schedules.map(schedule => (
        <ScheduleCard key={schedule._id} schedule={schedule} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
