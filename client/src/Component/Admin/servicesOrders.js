import React, { useState, useEffect } from 'react';
import './AdminSetting/Style/Tables.css';
// Assuming Modal and Button might be used later, keeping them for now.
// import { Modal, Button } from 'react-bootstrap';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import authApi from '../../api/authApi';

// --- ServiceOrderRow Component (unchanged) ---
const getStatusColor = (status) => {
  // Added handling for null/undefined status, defaulting to 'waiting' style visually
  const effectiveStatus = status || 'waiting';
  switch(effectiveStatus) {
    case 'waiting':
      return { bg: '#fff4e5', text: '#ff9800' };
    case 'processing':
      return { bg: '#e0f3ff', text: '#007bff' };
    case 'done':
      return { bg: '#e6f7ee', text: '#28a745' };
    case 'cancelled':
      return { bg: '#feeae9', text: '#dc3545' };
    default: // Should not happen with the effectiveStatus logic, but keep as fallback
      return { bg: '#f0f0f0', text: '#6c757d' };
  }
};

const ServiceOrderRow = ({ order, onStatusChange }) => (
    <tr>
      <td>{order.id}</td>
      <td>{order.userName || 'N/A'}</td>
      <td>
        <div>
           {order.productName || 'N/A'}
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
        whiteSpace: 'nowrap',
        textTransform: 'capitalize' // Added for consistent capitalization
      }}>
        {order.status || 'waiting'}
      </span>
      </td>
      {/* Ensure createdAt exists, fallback to created_at */}
      <td>{new Date(order.createdAt || order.created_at).toLocaleString()}</td>
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
      {/* Example: Add a delete button if needed later
      <td>
        <button
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteOrder(order.id)} // You would need to pass onDeleteOrder prop
        >
          Delete
        </button>
      </td>
       */}
    </tr>
);

// --- ServiceOrderTable Component (unchanged) ---
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
        {/* Add header if you add delete button <th>Delete</th> */}
      </tr>
      </thead>
      <tbody>
      {data.map(order => (
          <ServiceOrderRow
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
              // Pass onDeleteOrder={onDeleteOrder} if you add the delete button
          />
      ))}
      </tbody>
    </table>
);


// --- ServiceOrderManagement Component (UPDATED) ---
const ServiceOrderManagement = () => {
  const [orders, setOrders] = useState([]); // Holds ALL fetched orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState('All'); // State for active filter

  // Define the possible statuses for tabs
  const STATUS_OPTIONS = ['All', 'waiting', 'processing', 'done', 'cancelled'];

  // Fetch all service orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Clear previous errors on fetch
    try {
      const response = await authApi.get('/service-order');
      // Ensure response.data and response.data.orders exist and are an array
      if (response.data && Array.isArray(response.data.orders)) {
        // Default status to 'waiting' if missing or null
        const ordersWithDefaults = response.data.orders.map(order => ({
          ...order,
          status: order.status || 'waiting'
        }));
        setOrders(ordersWithDefaults);
      } else {
        console.warn('Received unexpected data format:', response.data);
        setOrders([]); // Set to empty array if format is wrong
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please check your connection and try again.');
      setOrders([]); // Clear orders on error
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    const ok = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (!ok) return;

    setLoading(true);
    setError(null);
    try {
      await authApi.post(`/service-order/update-status/${orderId}`, { status: newStatus });
      // Update the status in the main 'orders' state
      setOrders(prevOrders => prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
      ));
      // No need to refetch, local state update is sufficient for UI
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete service order (mark as inactive or actually delete)
  // NOTE: This example filters locally. Depending on API, you might need to refetch.
  const handleDeleteOrder = async (orderId) => {
    const ok = window.confirm('Are you sure you want to delete this order? This action might be irreversible.');
    if (!ok) return;

    setLoading(true);
    setError(null);
    try {
      // Assuming the API call removes the order or marks it inactive
      await authApi.delete(`/service-order/${orderId}`);
      // Remove the order from the local state immediately for better UX
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      // Optionally, you could call fetchOrders() here if the delete API doesn't return
      // updated data or if you want absolute certainty from the backend.
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
  }, []); // Empty dependency array means run only once on mount

  // Filter orders based on the active tab
  const filteredOrders = activeStatusFilter === 'All'
      ? orders
      : orders.filter(order => order.status === activeStatusFilter);

  // Show loading spinner only during the initial load
  if (loading && orders.length === 0) {
    return <LoadingSpinner />;
  }

  return (
      <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
        <div className='content-container' style={{ width: '100%' }}>
          <div className='nav-tabs'>
            <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h5>Service Order Management</h5>
              <button
                  className="btn btn-primary"
                  onClick={fetchOrders} // Keep refresh button functional
                  disabled={loading} // Disable while loading
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {/* Filter Tabs */}
            <div className='nav-tabs-container' style={{ marginBottom: '20px', borderBottom: '1px solid #dee2e6' }}>
              {STATUS_OPTIONS.map(status => (
                  <button
                      key={status}
                      className={`nav-tab ${activeStatusFilter === status ? 'active' : ''}`}
                      onClick={() => setActiveStatusFilter(status)}
                      disabled={loading} // Disable tabs while loading
                      style={{ textTransform: 'capitalize' }} // Display 'waiting' as 'Waiting', etc.
                  >
                    {status}
                  </button>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setError(null)} // Use standard dismiss pattern
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
          )}

          {/* Loading Indicator (for updates/refresh) */}
          {loading && orders.length > 0 && <div style={{ textAlign: 'center', margin: '20px 0' }}><LoadingSpinner /></div>}


          {/* Table Display Area */}
          <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
            {!loading && filteredOrders.length > 0 ? (
                <>
                  <ServiceOrderTable
                      data={filteredOrders} // Pass filtered data to the table
                      onStatusChange={handleStatusChange}
                      // Pass onDeleteOrder={handleDeleteOrder} // Uncomment if you add delete button
                  />
                  {/* Basic Pagination Example - Needs improvement for large datasets */}
                  <div className='table-pagination' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <span>Showing 1 to {filteredOrders.length} of {filteredOrders.length} entries {activeStatusFilter !== 'All' ? `(filtered from ${orders.length} total)` : ''}</span>
                    {/* Basic static pagination controls - implement real pagination if needed */}
                    <div className='pagination-controls'>
                      <button disabled>Previous</button>
                      <button className='active'>1</button>
                      <button disabled>Next</button>
                    </div>
                  </div>
                </>
            ) : (
                !loading && ( // Only show "No orders" if not loading
                    <div className="text-center py-5">
                      {orders.length === 0 ? (
                          <p>No service orders found.</p>
                      ) : (
                          <p>No service orders found with status "{activeStatusFilter}".</p>
                      )}
                    </div>
                )
            )}
          </div>
        </div>
      </div>
  );
};

export default ServiceOrderManagement;