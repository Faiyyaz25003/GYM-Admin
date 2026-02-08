// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import MemberCard from '../Members/MemberCard'; // assuming you have this or similar UI component

// const ExpireMember = () => {
//   const [expiringMembers, setExpiringMembers] = useState([]);

//   useEffect(() => {
//     const fetchExpiringMembers = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/members');
//         const today = new Date();

//         const filtered = res.data.filter(member => {
//           if (!member.endDate) return false;

//           const endDate = new Date(member.endDate);
//           const timeDiff = (endDate - today) / (1000 * 60 * 60 * 24); // in days
//           return timeDiff >= 0 && timeDiff <= 7;
//         });

//         setExpiringMembers(filtered);
//       } catch (err) {
//         toast.error('Failed to fetch members');
//       }
//     };

//     fetchExpiringMembers();
//   }, []);

//   return (
//     <div className="p-4">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-4 text-red-600">Expiring Members (within 7 days)</h1>

//       {expiringMembers.length === 0 ? (
//         <p className="text-gray-600">No members expiring soon.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {expiringMembers.map(member => (
//             <MemberCard key={member._id} member={member} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpireMember;


'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberCard from '../Members/MemberCard'; // UI card for member

const Expire = () => {
  const [expiringMembers, setExpiringMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ for filtering

  useEffect(() => {
    const fetchExpiringMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        const today = new Date();

        const filtered = res.data.filter((member) => {
          if (!member.endDate) return false;

          const endDate = new Date(member.endDate);
          const timeDiff = (endDate - today) / (1000 * 60 * 60 * 24); // in days
          return timeDiff >= 0 && timeDiff <= 7;
        });

        setExpiringMembers(filtered);
      } catch (err) {
        toast.error('Failed to fetch members');
      }
    };

    fetchExpiringMembers();
  }, []);

  // ✅ Filtered list based on search term
  const filteredMembers = expiringMembers.filter((member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-red-600">Expiring Members (within 7 days)</h1>

      {/* ✅ Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search trainees..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ Filtered Result Display */}
      {filteredMembers.length === 0 ? (
        <p className="text-gray-600">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Expire;
