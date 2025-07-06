// import React, { useState } from 'react';

// const TransactionsTable = ({ transactions }) => {
//   const [search, setSearch] = useState('');
//   const [filterType, setFilterType] = useState('All');
//   const [filterCategory, setFilterCategory] = useState('All');

//   const filtered = transactions.filter((tx) => {
//     const matchesSearch =
//       tx.note?.toLowerCase().includes(search.toLowerCase()) ||
//       tx.category?.toLowerCase().includes(search.toLowerCase());

//     const matchesType = filterType === 'All' || tx.type === filterType;
//     const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;

//     return matchesSearch && matchesType && matchesCategory;
//   });

//   const uniqueCategories = [...new Set(transactions.map((t) => t.category))];

//   return (
//     <div className="table-container">
//       <h3><span style={{ color: '#673ab7' }}>🔎</span> Transaction History</h3>
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by note or category"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//           <option>All</option>
//           <option>Income</option>
//           <option>Expense</option>
//         </select>
//         <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
//           <option>All</option>
//           {uniqueCategories.map((cat, i) => (
//             <option key={i}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       <table className="transactions-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Type</th>
//             <th>Category</th>
//             <th>Amount</th>
//             <th>Note</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((tx) => (
//             <tr key={tx._id}>
//               <td>{new Date(tx.date).toLocaleDateString()}</td>
//               <td>{tx.type}</td>
//               <td>{tx.category}</td>
//               <td>₹{tx.amount}</td>
//               <td>{tx.note}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TransactionsTable

import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [editId, setEditId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleEdit = (tx) => {
    setEditId(tx._id);
    setEditedRow({ ...tx });
  };

  const handleSave = () => {
    // Here you would send editedRow to the backend
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedRow({});
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.note?.toLowerCase().includes(search.toLowerCase()) ||
      tx.category?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || tx.type === filterType;
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const uniqueCategories = [...new Set(transactions.map((t) => t.category))];

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTransactions = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  return (
    <>
      <style>{`
        .table-container {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0 0 24px 0;
        }
        .filters {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }
        .filters input,
        .filters select {
          padding: 7px 10px;
          font-size: 15px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
        }
        .filters input:focus,
        .filters select:focus {
          border-color: #2563eb;
        }
        .export-btn {
          padding: 7px 14px;
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
        }
        .export-btn:hover {
          background: #174ea6;
        }
        .transactions-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18px;
        }
        .transactions-table th, .transactions-table td {
          border: 1px solid #e5e7eb;
          padding: 10px 8px;
          text-align: left;
        }
        .transactions-table th {
          background: #f3f4f6;
        }
        .pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 18px;
        }
        .pagination button {
          padding: 6px 12px;
          border: 1px solid #cbd5e1;
          background: #fff;
          border-radius: 5px;
          cursor: pointer;
        }
        .pagination button.active {
          background: #2563eb;
          color: #fff;
          border-color: #2563eb;
        }
      `}</style>
      <div className="table-container">
        <h3><span style={{ color: '#673ab7' }}>🔎</span> Transaction History</h3>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by note or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option>All</option>
            {uniqueCategories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
          <CSVLink
            data={filtered}
            filename={'transactions.csv'}
            className="export-btn"
          >
            Export CSV
          </CSVLink>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((tx) => (
              <tr key={tx._id}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>
                  {editId === tx._id ? (
                    <select value={editedRow.type} onChange={(e) => setEditedRow({ ...editedRow, type: e.target.value })}>
                      <option>Income</option>
                      <option>Expense</option>
                    </select>
                  ) : (
                    tx.type
                  )}
                </td>
                <td>
                  {editId === tx._id ? (
                    <input value={editedRow.category} onChange={(e) => setEditedRow({ ...editedRow, category: e.target.value })} />
                  ) : (
                    tx.category
                  )}
                </td>
                <td>
                  {editId === tx._id ? (
                    <input value={editedRow.amount} onChange={(e) => setEditedRow({ ...editedRow, amount: e.target.value })} />
                  ) : (
                    `₹${tx.amount}`
                  )}
                </td>
                <td>
                  {editId === tx._id ? (
                    <input value={editedRow.note} onChange={(e) => setEditedRow({ ...editedRow, note: e.target.value })} />
                  ) : (
                    tx.note
                  )}
                </td>
                <td>
                  {editId === tx._id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(tx)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;