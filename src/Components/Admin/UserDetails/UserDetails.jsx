

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/users');
        setUsers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Search logic
  useEffect(() => {
    const query = search.toLowerCase();
    const results = users.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
    setFiltered(results);
    setCurrentPage(1);
  }, [search, users]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
      const updatedUsers = users.filter(user => user._id !== id);
      setUsers(updatedUsers);
      toast.success("User deleted successfully");
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error("Failed to delete user");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.info("No users to export");
      return;
    }

    const headers = ["Name", "Email", "Phone", "DOB", "Gender", "Address", "Role"];
    const rows = filtered.map(user => [
      user.name,
      user.email,
      user.mobile,
      user.dob,
      user.gender,
      user.address,
      user.role
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(row => row.map(item => `"${item}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `users_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedUsers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading users...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">User Details</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search all fields..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow hover:opacity-90 transition"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-gray-900 text-white rounded-lg">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-300">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map(user => (
                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.mobile}</td>
                  <td className="py-3 px-4">{user.dob}</td>
                  <td className="py-3 px-4">{user.gender}</td>
                  <td className="py-3 px-4">{user.address}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
