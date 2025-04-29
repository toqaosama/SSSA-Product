import React, { useState } from 'react';
import './AdminSetting/Style/Tables.css';

// Mock data for meetings
const meetingData = {
  all: [
    { id: 1, customer: 'John Doe', date: '2023-06-15', time: '10:00 AM', purpose: 'Product Demo', status: 'confirmed', agent: 'Sarah Smith' },
    { id: 2, customer: 'Jane Smith', date: '2023-06-16', time: '2:30 PM', purpose: 'Consultation', status: 'pending', agent: 'Mike Johnson' },
    { id: 3, customer: 'Robert Brown', date: '2023-06-14', time: '11:15 AM', purpose: 'Support', status: 'cancelled', agent: 'Lisa Wong' }
  ],
  upcoming: [
    { id: 1, customer: 'John Doe', date: '2023-06-15', time: '10:00 AM', purpose: 'Product Demo', status: 'confirmed', agent: 'Sarah Smith' },
    { id: 2, customer: 'Jane Smith', date: '2023-06-16', time: '2:30 PM', purpose: 'Consultation', status: 'pending', agent: 'Mike Johnson' }
  ],
  past: [
    { id: 3, customer: 'Robert Brown', date: '2023-06-14', time: '11:15 AM', purpose: 'Support', status: 'cancelled', agent: 'Lisa Wong' }
  ]
};

const MeetingRow = ({ meeting, onEdit, onDelete }) => (
  <tr>
    <td>{meeting.id}</td>
    <td>{meeting.customer}</td>
    <td>{meeting.date}</td>
    <td>{meeting.time}</td>
    <td>{meeting.purpose}</td>
    <td><span className={`status-badge ${meeting.status}`}>{meeting.status}</span></td>
    <td>{meeting.agent}</td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(meeting)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(meeting.id)}>Delete</button>
    </td>
  </tr>
);

const MeetingTable = ({ data }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (meeting) => {
    setEditingId(meeting.id);
    console.log('Editing:', meeting);
  };

  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Time</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Agent</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(meeting => (
          <MeetingRow 
            key={meeting.id} 
            meeting={meeting} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export const MeetingManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = meetingData[activeTab];
  const totalEntries = currentData.length;

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs' style={{ width: '100%' }}>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h5>Meeting Appointments</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>
                Schedule Meeting
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
              className={`nav-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`nav-tab ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
          </div>
        </div>

        <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
          <MeetingTable data={currentData} />
          
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
            <h3>Schedule New Meeting</h3>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingManagement;