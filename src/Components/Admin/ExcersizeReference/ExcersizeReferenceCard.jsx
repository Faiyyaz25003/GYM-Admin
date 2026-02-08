
import React from 'react';

export default function ExcersizeReferenceCard({ id, videoUrl, title, category, description, createdAt, onDelete }) {
  // Check if the video is a YouTube link
  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  let embedUrl = videoUrl;

  // Convert to embed URL for YouTube
  if (videoUrl?.includes('watch?v=')) {
    const videoId = videoUrl.split('watch?v=')[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl?.includes('youtu.be/')) {
    const videoId = videoUrl.split('youtu.be/')[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div className="w-[350px] bg-white rounded-xl overflow-hidden shadow-md p-4">
      {/* Title */}
      {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}

      {/* Video or YouTube embed */}
      <div className="w-full h-48 mb-3">
        {videoUrl ? (
          isYouTube ? (
            <iframe
              className="w-full h-full rounded"
              src={embedUrl}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <video
              controls
              className="w-full h-full object-cover rounded"
              src={videoUrl}
            />
          )
        ) : (
          <p className="text-red-500">No video available</p>
        )}
      </div>

      {/* Category */}
      <p><strong>Category:</strong> {category || 'N/A'}</p>

      {/* Description */}
      <p><strong>Description:</strong> {description || 'N/A'}</p>

      {/* Created Date */}
      {createdAt && (
        <p className="text-sm text-gray-500 mt-1">
          <strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      )}

      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="mt-3 ml-[10px] w-[290px] bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
}
