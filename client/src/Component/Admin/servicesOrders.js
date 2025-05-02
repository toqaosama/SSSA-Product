import React, { useState, useEffect } from 'react';
import './AdminSetting/Style/Tables.css';
import { Modal, Button } from 'react-bootstrap';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// Mock data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

const mockProducts = [
  { id: 1, name: 'Product A', price: 19.99 },
  { id: 2, name: 'Product B', price: 29.99 },
  { id: 3, name: 'Product C', price: 39.99 }
];

const mockOrders = [
  { 
    id: 1, 
    user_id: 1, 
    user: mockUsers[0], 
    product_id: 1, 
    product: mockProducts[0], 
    status: 'waiting', 
    created_at: '2023-05-01T10:00:00Z' 
  },
  { 
    id: 2, 
    user_id: 2, 
    user: mockUsers[1], 
    product_id: 2, 
    product: mockProducts[1], 
    status: 'processing', 
    created_at: '2023-05-02T11:30:00Z' 
  },
  { 
    id: 3, 
    user_id: 3, 
    user: mockUsers[2], 
    product_id: 3, 
    product: mockProducts[2], 
    status: 'done', 
    created_at: '2023-05-03T09:15:00Z' 
  }
];

const ServiceOrderRow = ({ order, onEdit, onStatusChange }) => (
  <tr>
    <td>{order.id}</td>
    <td>{order.user ? order.user.name : 'N/A'}</td>
    <td>
      {order.product ? (
        <div>
          <div>ID: {order.product.id}</div>
          <div>Name: {order.product.name}</div>
        </div>
      ) : 'N/A'}
    </td>
    <td>
      <span style={{
        backgroundColor: getStatusColor(order.status).bg,
        color: getStatusColor(order.status).text,
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: '500',
        whiteSpace: 'nowrap'
      }}>
        {order.status}
      </span>
    </td>
    <td>{new Date(order.created_at).toLocaleString()}</td>
    <td>
      <select 
        className="form-control form-control-sm" 
        value={order.status}
        onChange={(e) => onStatusChange(order.id, e.target.value)}
        style={{ width: '120px' }}
      >
        <option value="waiting">Waiting</option>
        <option value="processing">Processing</option>
        <option value="done">Done</option>
        <option value="received">Received</option>
      </select>
      <button 
        className="btn btn-danger btn-sm mt-1" 
        onClick={() => onStatusChange(order.id, 'cancelled')}
        style={{ width: '120px' }}
      >
        Cancel
      </button>
    </td>
  </tr>
);

const getStatusColor = (status) => {
  switch(status) {
    case 'waiting':
      return { bg: '#fff4e5', text: '#ff9800' };
    case 'processing':
      return { bg: '#e0f3ff', text: '#007bff' };
    case 'done':
      return { bg: '#e6f7ee', text: '#28a745' };
    case 'received':
      return { bg: '#f0f0f0', text: '#6c757d' };
    case 'cancelled':
      return { bg: '#feeae9', text: '#dc3545' };
    default:
      return { bg: '#f0f0f0', text: '#6c757d' };
  }
};

const ServiceOrderTable = ({ data, onEdit, onStatusChange }) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>User</th>
        <th>Product</th>
        <th>Status</th>
        <th>Order Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map(order => (
        <ServiceOrderRow
          key={order.id}
          order={order}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </tbody>
  </table>
);

export const ServiceOrderManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [orders, setOrders] = useState(mockOrders);
  const [users] = useState(mockUsers);
  const [products] = useState(mockProducts);
  const [formData, setFormData] = useState({
    user_id: '',
    product_id: '',
    status: 'waiting'
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (editingOrder) {
        // Update existing order
        setOrders(prev => prev.map(order => 
          order.id === editingOrder.id ? { ...order, ...formData } : order
        ));
      } else {
        // Add new order
        const newOrder = {
          id: Math.max(...orders.map(o => o.id)) + 1,
          user_id: formData.user_id,
          user: users.find(u => u.id === parseInt(formData.user_id)),
          product_id: formData.product_id,
          product: products.find(p => p.id === parseInt(formData.product_id)),
          status: formData.status,
          created_at: new Date().toISOString()
        };
        setOrders(prev => [...prev, newOrder]);
      }
      
      setShowAddModal(false);
      setFormData({
        user_id: '',
        product_id: '',
        status: 'waiting'
      });
      setEditingOrder(null);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      user_id: order.user_id,
      product_id: order.product_id,
      status: order.status
    });
    setShowAddModal(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const ok = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (!ok) return;
    
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      setLoading(false);
    }, 300);
  };

  const currentData = orders;
  const totalEntries = currentData.length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
<div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container' style={{ width: '100%' }}>
        <div className='nav-tabs'>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5>Service Order Management</h5>
          </div>
          <div className='nav-tabs-container'>
            <button className="nav-tab active">All</button>
          </div>
        </div>
        <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
          <ServiceOrderTable 
            data={currentData} 
            onEdit={handleEdit} 
            onStatusChange={handleStatusChange} 
          />
          <div className='table-pagination' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <span>Showing 1 to {totalEntries} of {totalEntries} entries</span>
            <div className='pagination-controls'>
              <button disabled>Previous</button>
              <button className='active'>1</button>
              <button disabled={totalEntries <= 10}>Next</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceOrderManagement;