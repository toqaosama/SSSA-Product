import React, { useState } from 'react';
import './AdminSetting/Style/Tables.css';

// Mock data for categories
const categoryData = {
  all: [
    { id: 1, name: 'Electronics', products: 42, status: 'active' },
    { id: 2, name: 'Clothing', products: 38, status: 'active' },
    { id: 3, name: 'Home & Garden', products: 25, status: 'active' },
    { id: 4, name: 'Seasonal', products: 0, status: 'inactive' }
  ],
  active: [
    { id: 1, name: 'Electronics', products: 42, status: 'active' },
    { id: 2, name: 'Clothing', products: 38, status: 'active' },
    { id: 3, name: 'Home & Garden', products: 25, status: 'active' }
  ],
  inactive: [
    { id: 4, name: 'Seasonal', products: 0, status: 'inactive' },
    { id: 5, name: 'Discontinued', products: 0, status: 'inactive' }
  ]
};

const CategoryRow = ({ category, onEdit, onDelete }) => (
  <tr>
    <td>{category.id}</td>
    <td>{category.name}</td>
    <td>{category.products}</td>
    <td><span className={`status-badge ${category.status}`}>{category.status}</span></td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(category)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(category.id)}>Delete</button>
    </td>
  </tr>
);

const CategoryTable = ({ data }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (category) => {
    setEditingId(category.id);
    console.log('Editing:', category);
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
          <th>Products</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(category => (
          <CategoryRow 
            key={category.id} 
            category={category} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = categoryData[activeTab];
  const totalEntries = currentData.length;

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs' style={{ width: '100%' }}>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h5>Category Management</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>
                Add New Category
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
              className={`nav-tab ${activeTab === 'inactive' ? 'active' : ''}`}
              onClick={() => setActiveTab('inactive')}
            >
              Inactive
            </button>
          </div>
        </div>

        <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
          <CategoryTable data={currentData} />
          
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
          <div className="modal-contentss">
            <h3>Add New Category</h3>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
// At the end of CategoryManagement.jsx
export default CategoryManagement;