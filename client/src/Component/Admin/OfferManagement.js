import React, { useState } from 'react';
import './AdminSetting/Style/Tables.css';

// Mock data for offers
const offerData = {
  all: [
    { id: 1, name: 'Summer Sale', discount: 20, startDate: '2023-06-01', endDate: '2023-06-30', status: 'active', products: 15 },
    { id: 2, name: 'Black Friday', discount: 30, startDate: '2023-11-24', endDate: '2023-11-27', status: 'upcoming', products: 8 },
    { id: 3, name: 'New Year', discount: 15, startDate: '2022-12-30', endDate: '2023-01-05', status: 'expired', products: 12 }
  ],
  active: [
    { id: 1, name: 'Summer Sale', discount: 20, startDate: '2023-06-01', endDate: '2023-06-30', status: 'active', products: 15 }
  ],
  upcoming: [
    { id: 2, name: 'Black Friday', discount: 30, startDate: '2023-11-24', endDate: '2023-11-27', status: 'upcoming', products: 8 }
  ],
  expired: [
    { id: 3, name: 'New Year', discount: 15, startDate: '2022-12-30', endDate: '2023-01-05', status: 'expired', products: 12 }
  ]
};

const OfferRow = ({ offer, onEdit, onDelete }) => (
  <tr>
    <td>{offer.id}</td>
    <td>{offer.name}</td>
    <td>{offer.discount}%</td>
    <td>{offer.startDate}</td>
    <td>{offer.endDate}</td>
    <td><span className={`status-badge ${offer.status}`}>{offer.status}</span></td>
    <td>{offer.products}</td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(offer)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(offer.id)}>Delete</button>
    </td>
  </tr>
);

const OfferTable = ({ data }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (offer) => {
    setEditingId(offer.id);
    console.log('Editing:', offer);
  };

  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Offer Name</th>
          <th>Discount</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Products</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(offer => (
          <OfferRow 
            key={offer.id} 
            offer={offer} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export const OfferManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = offerData[activeTab];
  const totalEntries = currentData.length;

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs' style={{ width: '100%' }}>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h5>Offer Management</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>
                Add New Offer
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
              className={`nav-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
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
          <OfferTable data={currentData} />
          
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
            <h3>Add New Offer</h3>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferManagement;