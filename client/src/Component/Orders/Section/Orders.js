import React, { useState, useEffect } from 'react';
import { 
  House, 
  Truck, 
  CheckCircle, 
  BoxArrowInDown
} from 'react-bootstrap-icons';
import { Badge, Spinner, Alert } from "react-bootstrap";
import authApi from '../../../api/authApi';
import './Stlye/Orders.css';

const statusConfig = {
  waiting: { display: 'Waiting', badge: 'warning', step: 0 },
  processing: { display: 'Processing', badge: 'info', step: 1 },
  done: { display: 'Delivered', badge: 'success', step: 2 },
  received: { display: 'Received', badge: 'success', step: 3 },
  cancelled: { display: 'Cancelled', badge: 'danger', step: -1 }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.get('/service-order/me');
      console.log('API Response:', response); // Debug log
      if (response.data && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      console.error('API Error:', err.response || err.message || err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <Alert variant="danger" className="m-3">
          Error: {error}
          <div className="mt-2">
            <button 
              onClick={fetchOrders}
              className="btn btn-sm btn-primary"
            >
              Retry
            </button>
          </div>
        </Alert>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <Alert variant="info" className="m-3">
          No orders found
          <div className="mt-2">
            <button 
              onClick={fetchOrders}
              className="btn btn-sm btn-primary"
            >
              Refresh
            </button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <div className="header-item product">Product</div>
          <div className="header-item date">Order Date</div>
          <div className="header-item status">Status</div>
          <div className="header-item actions">Actions</div>
        </div>

        {orders.map((order) => {
          console.log(order.status)
          const statusInfo = statusConfig[order.status.toLowerCase()] || statusConfig.waiting;
          const currentStep = statusInfo.step;
          console.log(order)
          
          return (
            <div key={order.id} className="order-item">
              <div className="order-product">
                <div className="product-name">
                  {order.productName || 'N/A'}
                </div>
                <div className="order-id">#{order.id}</div>
              </div>
              
              <div className="order-date">
                {new Date(order.created_at).toLocaleDateString()}
              </div>
              
              <div className="order-status">
                <Badge pill bg={statusInfo.badge}>
                  {statusInfo.display}
                </Badge>
              </div>
              
              <div className="order-actions">
  {order.status.toLowerCase() === 'cancelled' ? (
    <Badge bg="danger">Cancelled</Badge>
  ) : currentStep >= 0 && (
    <div className="status-tracker">
      {/* Waiting Step */}
      <div className={`tracker-step ${currentStep >= 0 ? 'active' : ''}`}>
        <div className="step-icon-container">
          <House className="step-icon" />
        </div>
        <div className="step-label">Waiting</div>
      </div>

      <div className={`tracker-connector ${currentStep >= 1 ? 'active' : ''}`}></div>

      {/* Processing Step */}
      <div className={`tracker-step ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="step-icon-container">
          <Truck className="step-icon" />
        </div>
        <div className="step-label">Processing</div>
      </div>

      <div className={`tracker-connector ${currentStep >= 2 ? 'active' : ''}`}></div>

      {/* Delivered Step */}
      <div className={`tracker-step ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="step-icon-container">
          <CheckCircle className="step-icon" />
        </div>
        <div className="step-label">Done</div>
      </div>
    </div>
  )}
</div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;