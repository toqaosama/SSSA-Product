import React, { useState, useEffect } from 'react';
import './AdminSetting/Style/Tables.css';
import { Modal, Button } from 'react-bootstrap';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import authApi from '../../api/authApi';

const ServiceOrderRow = ({ order, onStatusChange }) => (
    <tr>
      <td>{order.id}</td>
      <td>{order.userName || 'N/A'}</td>
      <td>
        <div>
          <div>ID: {order.product_id}</div>
          <div>Name: {order.productName || 'N/A'}</div>
        </div>
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
        {order.status || 'waiting'}
      </span>
      </td>
      <td>{new Date(order.created_at || order.createdAt).toLocaleString()}</td>
      <td>
        <select
            className="form-control form-control-sm"
            value={order.status || 'waiting'}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            style={{ width: '120px' }}
        >
          <option value="waiting">Waiting</option>
          <option value="processing">Processing</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
    case 'cancelled':
      return { bg: '#feeae9', text: '#dc3545' };
    default:
      return { bg: '#f0f0f0', text: '#6c757d' };
  }
};

const ServiceOrderTable = ({ data, onStatusChange }) => (
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
              onStatusChange={onStatusChange}
          />
      ))}
      </tbody>
    </table>
);

const ServiceOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all service orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await authApi.get('/service-order');
      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    const ok = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (!ok) return;

    setLoading(true);
    try {
      // Since the API doesn't have a specific endpoint for status updates,
      // we'll update it locally for now
      // In a real implementation, you would create a proper endpoint for this
      setOrders(prev => prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete service order (mark as inactive)
  const handleDeleteOrder = async (orderId) => {
    const ok = window.confirm('Are you sure you want to delete this order?');
    if (!ok) return;

    setLoading(true);
    try {
      await authApi.delete(`/service-order/${orderId}`);
      // Remove the order from the list
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Failed to delete order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading && orders.length === 0) {
    return <LoadingSpinner />;
  }

  return (
      <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
        <div className='content-container' style={{ width: '100%' }}>
          <div className='nav-tabs'>
            <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5>Service Order Management</h5>
              <button
                  className="btn btn-primary"
                  onClick={() => fetchOrders()}
              >
                Refresh
              </button>
            </div>
            <div className='nav-tabs-container'>
              <button className="nav-tab active">All</button>
            </div>
          </div>

          {error && (
              <div className="alert alert-danger" role="alert">
                {error}
                <button
                    type="button"
                    className="close"
                    onClick={() => setError(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
          )}

          <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
            {orders.length > 0 ? (
                <>
                  <ServiceOrderTable
                      data={orders}
                      onStatusChange={handleStatusChange}
                  />
                  <div className='table-pagination' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <span>Showing 1 to {orders.length} of {orders.length} entries</span>
                    <div className='pagination-controls'>
                      <button disabled>Previous</button>
                      <button className='active'>1</button>
                      <button disabled={orders.length <= 10}>Next</button>
                    </div>
                  </div>
                </>
            ) : (
                <div className="text-center py-5">
                  <p>No service orders found.</p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ServiceOrderManagement;