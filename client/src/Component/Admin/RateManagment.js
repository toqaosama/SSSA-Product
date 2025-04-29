import React, { useState } from 'react';
import './AdminSetting/Style/Tables.css';

// Mock data for rates
const rateData = {
  all: [
    { id: 1, product: 'Laptop', basePrice: 999.99, currentRate: 899.99, discount: 10, startDate: '2023-06-01', endDate: '2023-06-30' },
    { id: 2, product: 'Smartphone', basePrice: 699.99, currentRate: 629.99, discount: 10, startDate: '2023-06-01', endDate: '2023-06-30' },
    { id: 3, product: 'Headphones', basePrice: 149.99, currentRate: 119.99, discount: 20, startDate: '2023-05-15', endDate: '2023-05-31' }
  ],
  active: [
    { id: 1, product: 'Laptop', basePrice: 999.99, currentRate: 899.99, discount: 10, startDate: '2023-06-01', endDate: '2023-06-30' },
    { id: 2, product: 'Smartphone', basePrice: 699.99, currentRate: 629.99, discount: 10, startDate: '2023-06-01', endDate: '2023-06-30' }
  ],
  expired: [
    { id: 3, product: 'Headphones', basePrice: 149.99, currentRate: 119.99, discount: 20, startDate: '2023-05-15', endDate: '2023-05-31' }
  ]
};

const RateRow = ({ rate, onEdit, onDelete }) => (
  <tr>
    <td>{rate.id}</td>
    <td>{rate.product}</td>
    <td>${rate.basePrice.toFixed(2)}</td>
    <td>${rate.currentRate.toFixed(2)}</td>
    <td>{rate.discount}%</td>
    <td>{rate.startDate}</td>
    <td>{rate.endDate}</td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(rate)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(rate.id)}>Delete</button>
    </td>
  </tr>
);

const RateTable = ({ data }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (rate) => {
    setEditingId(rate.id);
    console.log('Editing:', rate);
  };

  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Base Price</th>
          <th>Current Rate</th>
          <th>Discount</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(rate => (
          <RateRow 
            key={rate.id} 
            rate={rate} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export const RateManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = rateData[activeTab];
  const totalEntries = currentData.length;

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs' style={{ width: '100%' }}>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h5>Rate Management</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>
                Set New Rate
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
              className={`nav-tab ${activeTab === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              Expired
            </button>
          </div>
        </div>

        <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
          <RateTable data={currentData} />
          
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
            <h3>Set New Rate</h3>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateManagement;