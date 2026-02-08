
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Save, X } from 'lucide-react';

// const MemberForm = ({ onSave, onCancel, editingMember }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     plan: '',
//     joinDate: new Date().toISOString().slice(0, 10),
//     endDate: '',
//     profilePic: '',
//   });

//   // Effect to handle edit mode
//   useEffect(() => {
//     if (editingMember) {
//       setFormData({
//         ...editingMember,
//         joinDate: new Date(editingMember.joinDate).toISOString().slice(0, 10),
//         endDate: editingMember.endDate
//           ? new Date(editingMember.endDate).toISOString().slice(0, 10)
//           : '',
//       });
//     }
//   }, [editingMember]);

//   // Function to calculate end date based on plan and join date
//   const calculateEndDate = (joinDate, plan) => {
//     const durationMap = {
//       '1 Month': 1,
//       '3 Months': 3,
//       '6 Months': 6,
//       '12 Months': 12,
//     };

//     const months = durationMap[plan];
//     if (!months || !joinDate) return '';

//     const join = new Date(joinDate);
//     join.setMonth(join.getMonth() + months);
//     return join.toISOString().slice(0, 10);
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };
//       if (name === 'joinDate' || name === 'plan') {
//         updated.endDate = calculateEndDate(
//           name === 'joinDate' ? value : prev.joinDate,
//           name === 'plan' ? value : prev.plan
//         );
//       }
//       return updated;
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           profilePic: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       plan: '',
//       joinDate: new Date().toISOString().slice(0, 10),
//       endDate: '',
//       profilePic: '',
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//         {editingMember ? 'Edit Member' : 'Add New Member'}
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />

//         {/* Plan dropdown for predefined durations */}
//         <select
//           name="plan"
//           value={formData.plan}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         >
//           <option value="">Select Plan</option>
//           <option value="1 Month">1 Month</option>
//           <option value="3 Months">3 Months</option>
//           <option value="6 Months">6 Months</option>
//           <option value="12 Months">12 Months</option>
//         </select>

//         <input
//           type="date"
//           name="joinDate"
//           value={formData.joinDate}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           readOnly
//           className="border p-2 rounded bg-gray-100 text-gray-700"
//         />

//         <div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="border p-2 rounded w-full"
//           />
//           {formData.profilePic && (
//             <img
//               src={formData.profilePic}
//               alt="Profile Preview"
//               className="w-24 h-24 object-cover rounded mt-2 border"
//             />
//           )}
//         </div>

//         <textarea
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           className="border p-2 rounded md:col-span-2"
//           required
//         />
//       </div>

//       <div className="flex gap-2 mt-4">
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1"
//         >
//           <Save size={16} /> Save
//         </button>
//         <button
//           type="button"
//           className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-1"
//           onClick={onCancel}
//         >
//           <X size={16} /> Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MemberForm;



'use client';
import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const MemberForm = ({ onSave, onCancel, editingMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    plan: '',
    goal: '', // 🔹 NEW FIELD
    joinDate: new Date().toISOString().slice(0, 10),
    endDate: '',
    profilePic: '',
  });

  // Effect to handle edit mode
  useEffect(() => {
    if (editingMember) {
      setFormData({
        ...editingMember,
        joinDate: new Date(editingMember.joinDate).toISOString().slice(0, 10),
        endDate: editingMember.endDate
          ? new Date(editingMember.endDate).toISOString().slice(0, 10)
          : '',
      });
    }
  }, [editingMember]);

  // Function to calculate end date based on plan and join date
  const calculateEndDate = (joinDate, plan) => {
    const durationMap = {
      '1 Month': 1,
      '3 Months': 3,
      '6 Months': 6,
      '12 Months': 12,
    };

    const months = durationMap[plan];
    if (!months || !joinDate) return '';

    const join = new Date(joinDate);
    join.setMonth(join.getMonth() + months);
    return join.toISOString().slice(0, 10);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'joinDate' || name === 'plan') {
        updated.endDate = calculateEndDate(
          name === 'joinDate' ? value : prev.joinDate,
          name === 'plan' ? value : prev.plan
        );
      }
      return updated;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      plan: '',
      goal: '', // reset goal
      joinDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      profilePic: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {editingMember ? 'Edit Member' : 'Add New Member'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Plan dropdown */}
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Plan</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="12 Months">12 Months</option>
        </select>

        {/* Goal field (NEW) */}
        <input
          type="text"
          name="goal"
          placeholder="Goal (e.g., Weight Loss, Muscle Gain)"
          value={formData.goal}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          readOnly
          className="border p-2 rounded bg-gray-100 text-gray-700"
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          {formData.profilePic && (
            <img
              src={formData.profilePic}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded mt-2 border"
            />
          )}
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
          required
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <Save size={16} /> Save
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-1"
          onClick={onCancel}
        >
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
};

export default MemberForm;
