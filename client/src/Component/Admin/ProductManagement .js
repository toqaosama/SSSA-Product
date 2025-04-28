import React, { useState } from 'react';
import './AdminSetting/Style/Tables.css';

// Mock data for products
const productData = {
  all: [
    { id: 1, name: 'Laptop', price: 999.99, stock: 15, status: 'active', category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, stock: 30, status: 'active', category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 149.99, stock: 0, status: 'inactive', category: 'Accessories' }
  ],
  active: [
    { id: 1, name: 'Laptop', price: 999.99, stock: 15, status: 'active', category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, stock: 30, status: 'active', category: 'Electronics' }
  ],
  inactive: [
    { id: 3, name: 'Headphones', price: 149.99, stock: 0, status: 'inactive', category: 'Accessories' },
    { id: 4, name: 'Old Model', price: 199.99, stock: 5, status: 'inactive', category: 'Electronics' }
  ]
};

const ProductRow = ({ product, onEdit, onDelete }) => (
  <tr>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>{product.stock}</td>
    <td><span className={`status-badge ${product.status}`}>{product.status}</span></td>
    <td>{product.category}</td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(product)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(product.id)}>Delete</button>
    </td>
  </tr>
);

const ProductTable = ({ data }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (product) => {
    setEditingId(product.id);
    console.log('Editing:', product);
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
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(product => (
          <ProductRow 
            key={product.id} 
            product={product} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = productData[activeTab];
  const totalEntries = currentData.length;

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs' style={{ width: '100%' }}>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h5>Product Management</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>
                Add New Product
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
          <ProductTable data={currentData} />
          
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
            <h3>Add New Product</h3>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// At the end of ProductManagement.jsx
export default ProductManagement;