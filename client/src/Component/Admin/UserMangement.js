import React, { useState } from 'react';
import './AdminSetting/Style/Tables.css';

// Mock data
const tableData = {
  all: [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'Moderator' }
  ],
  active: [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'Moderator' }
  ],
  deactive: [
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User' }
  ]
};

const TableRow = ({ user, onEdit, onDelete }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td><span className={`status-badge ${user.status}`}>{user.status}</span></td>
    <td>{user.role}</td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(user)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(user.id)}>Delete</button>
    </td>
  </tr>
);

const UserTable = ({ data }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (user) => {
    setEditingId(user.id);
    console.log('Editing:', user);
  };

  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <TableRow 
            key={user.id} 
            user={user} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

const Tables = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = tableData[activeTab];
  const totalEntries = currentData.length;

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs' style={{ width: '100%' }}>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h5>User Management</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>
                Add New
              </button>
            </div>
          </div>
          
          <div className='nav-tabs-container' style={{ width: '100%' }}>
            <button 
              className={`nav-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`nav-tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`nav-tab ${activeTab === 'deactive' ? 'active' : ''}`}
              onClick={() => setActiveTab('deactive')}
            >
              Deactive
            </button>
          </div>
        </div>

        <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
          <UserTable data={currentData} />
          
          <div className='table-pagination' style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <span>Showing 1 to {totalEntries} of {totalEntries} entries</span>
            <div className='pagination-controls'>
              <button disabled>Previous</button>
              <button className='active'>1</button>
              <button disabled={totalEntries <= 10}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New User</h3>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;