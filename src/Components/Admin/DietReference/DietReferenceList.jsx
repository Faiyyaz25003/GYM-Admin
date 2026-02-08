
import React, { useEffect, useState } from 'react';
import ReferenceCard from './DietReferenceCard';

export default function DietReferenceList({ searchTerm }) {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/references');
        const data = await res.json();
        setReferences(data);
      } catch (err) {
        console.error('Failed to fetch references:', err);
      }
    };
    fetchReferences();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/references/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('Delete failed:', result);
        throw new Error(result.message || 'Delete failed');
      }

      setReferences((prev) => prev.filter((ref) => ref._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting reference');
    }
  };

  // 🔍 Filter only by category
  const filteredReferences = references.filter((ref) =>
    ref.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-start">
      {filteredReferences.length === 0 ? (
        <p className="text-gray-500">No references found.</p>
      ) : (
        filteredReferences.map((ref) => (
          <ReferenceCard
            key={ref._id}
            id={ref._id}
            videoUrl={ref.videoUrl}
            category={ref.category}
            description={ref.description}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
