import React from 'react';
import DietCard from './DietCard';

const DietList = ({ diets }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Assigned Diets</h3>
      {diets.length === 0 ? (
        <p className="text-gray-500">No diets assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {diets.map(diet => (
            <DietCard key={diet._id} diet={diet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DietList;