// 'use client';

// import React, { useState, useRef } from 'react';

// const USER_ID = 'USER123'; // abhi hardcoded

// export default function Attendance() {
//   const [punchInData, setPunchInData] = useState(null);
//   const [punchOutData, setPunchOutData] = useState(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [punchType, setPunchType] = useState('');
//   const [punchInTimestamp, setPunchInTimestamp] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const startCamera = async (type) => {
//     setPunchType(type);
//     setIsCameraOpen(true);

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (err) {
//       alert('Camera permission denied');
//       setIsCameraOpen(false);
//     }
//   };

//   const capturePhoto = async () => {
//     const context = canvasRef.current.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, 300, 300);
//     const photo = canvasRef.current.toDataURL('image/png');

//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const location = `Lat:${position.coords.latitude}, Lon:${position.coords.longitude}`;

//       try {
//         setLoading(true);

//         const endpoint =
//           punchType === 'in'
//             ? 'http://localhost:5000/api/attendance/punch-in'
//             : 'http://localhost:5000/api/attendance/punch-out';

//         const res = await fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             userId: USER_ID,
//             photo,
//             location,
//           }),
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);

//         if (punchType === 'in') {
//           setPunchInData({
//             photo,
//             location,
//             time: new Date(data.attendance.punchIn.time).toLocaleTimeString(),
//           });
//           setPunchInTimestamp(Date.now());
//         } else {
//           setPunchOutData({
//             photo,
//             location,
//             time: new Date(data.attendance.punchOut.time).toLocaleTimeString(),
//           });
//         }

//         stopCamera();
//       } catch (err) {
//         alert(err.message);
//       } finally {
//         setLoading(false);
//       }
//     });
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current?.srcObject;
//     stream?.getTracks().forEach((track) => track.stop());
//     videoRef.current.srcObject = null;
//     setIsCameraOpen(false);
//   };

//   const canPunchOut =
//     punchInTimestamp && Date.now() - punchInTimestamp >= 60 * 60 * 1000;

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
//       <h1 className="text-4xl font-bold text-blue-700 mb-8">
//         Gym Attendance Tracker
//       </h1>

//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-6">
//         {/* Punch In */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Punch In</h2>
//           <p>Time: {punchInData?.time || '--:--'}</p>
//           <p>Location: {punchInData?.location || 'Not punched in'}</p>

//           {punchInData?.photo && (
//             <img src={punchInData.photo} className="w-32 mt-2 rounded" />
//           )}

//           <button
//             disabled={!!punchInData}
//             onClick={() => startCamera('in')}
//             className="mt-3 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Punch In
//           </button>
//         </div>

//         <hr />

//         {/* Punch Out */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Punch Out</h2>
//           <p>Time: {punchOutData?.time || '--:--'}</p>
//           <p>Location: {punchOutData?.location || 'Not punched out'}</p>

//           {punchOutData?.photo && (
//             <img src={punchOutData.photo} className="w-32 mt-2 rounded" />
//           )}

//           <button
//             disabled={!canPunchOut || !!punchOutData}
//             onClick={() => startCamera('out')}
//             className="mt-3 w-full bg-gray-700 text-white py-2 rounded disabled:opacity-50"
//           >
//             Punch Out
//           </button>
//         </div>
//       </div>

//       {/* Camera Modal */}
//       {isCameraOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-full max-w-md">
//             <video ref={videoRef} autoPlay className="w-full rounded" />
//             <canvas ref={canvasRef} width={300} height={300} className="hidden" />

//             <div className="flex gap-4 mt-4">
//               <button onClick={stopCamera} className="flex-1 bg-gray-500 text-white py-2 rounded">
//                 Cancel
//               </button>
//               <button
//                 onClick={capturePhoto}
//                 disabled={loading}
//                 className="flex-1 bg-green-600 text-white py-2 rounded"
//               >
//                 {loading ? 'Saving...' : 'Capture'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useRef } from "react";

export default function Attendance() {
  const [punchInData, setPunchInData] = useState(null);
  const [punchOutData, setPunchOutData] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [punchType, setPunchType] = useState("");
  const [punchInTimestamp, setPunchInTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async (type) => {
    setPunchType(type);
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera permission denied");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = async () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 300);
    const photo = canvasRef.current.toDataURL("image/png");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = `Lat:${position.coords.latitude}, Lon:${position.coords.longitude}`;

        try {
          setLoading(true);

          const endpoint =
            punchType === "in"
              ? "http://localhost:5000/api/attendance/punch-in"
              : "http://localhost:5000/api/attendance/punch-out";

          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}` // agar JWT use kar rahe ho
            },
            credentials: "include", // agar session / cookie auth hai
            body: JSON.stringify({
              photo,
              location,
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          if (punchType === "in") {
            setPunchInData({
              photo,
              location,
              time: new Date(data.attendance.punchIn.time).toLocaleTimeString(),
            });
            setPunchInTimestamp(Date.now());
          } else {
            setPunchOutData({
              photo,
              location,
              time: new Date(
                data.attendance.punchOut.time,
              ).toLocaleTimeString(),
            });
          }

          stopCamera();
        } catch (err) {
          alert(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => alert("Location permission denied"),
    );
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraOpen(false);
  };

  const canPunchOut =
    punchInTimestamp && Date.now() - punchInTimestamp >= 60 * 60 * 1000;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Gym Attendance Tracker
      </h1>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Punch In */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Punch In</h2>
          <p>Time: {punchInData?.time || "--:--"}</p>
          <p>Location: {punchInData?.location || "Not punched in"}</p>

          {punchInData?.photo && (
            <img
              src={punchInData.photo}
              className="w-32 mt-2 rounded"
              alt="Punch In"
            />
          )}

          <button
            disabled={!!punchInData}
            onClick={() => startCamera("in")}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            Punch In
          </button>
        </div>

        <hr />

        {/* Punch Out */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Punch Out</h2>
          <p>Time: {punchOutData?.time || "--:--"}</p>
          <p>Location: {punchOutData?.location || "Not punched out"}</p>

          {punchOutData?.photo && (
            <img
              src={punchOutData.photo}
              className="w-32 mt-2 rounded"
              alt="Punch Out"
            />
          )}

          <button
            disabled={!canPunchOut || !!punchOutData}
            onClick={() => startCamera("out")}
            className="mt-3 w-full bg-gray-700 text-white py-2 rounded disabled:opacity-50"
          >
            Punch Out
          </button>
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <video ref={videoRef} autoPlay className="w-full rounded" />
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="hidden"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={stopCamera}
                className="flex-1 bg-gray-500 text-white py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                {loading ? "Saving..." : "Capture"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
