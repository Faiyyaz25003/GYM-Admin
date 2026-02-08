
'use client';

import React, { useEffect, useState } from 'react';

const ContactData = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date'];
    const rows = filteredContacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      contact.message,
      new Date(contact.createdAt).toLocaleString()
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
  };

  // 🔍 Search by all fields
  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf4ff] via-[#f0f5ff] to-[#fff0f6] py-12 px-4 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Visitor Messages
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search all fields..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={exportToCSV}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 animate-pulse">Loading...</p>
      ) : filteredContacts.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-700 bg-white">
          <table className="min-w-full text-white">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-left">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Subject</th>
                <th className="py-4 px-6">Message</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  className={`${
                    index % 2 === 0 ? 'bg-[#0f172a]' : 'bg-[#1e293b]'
                  }`}
                >
                  <td className="py-3 px-6 border-b border-gray-700">{contact.name}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{contact.email}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{contact.phone}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{contact.subject}</td>
                  <td className="py-3 px-6 border-b border-gray-700 truncate max-w-xs">{contact.message}</td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
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
    </div>
  );
};

export default ContactData;
