import React from 'react';
import { 
  House, 
  Truck, 
  CheckCircle, 
  BoxArrowInDown,
  List // Added List icon (or choose another)
} from 'react-bootstrap-icons';
import './Stlye/Orders.css';

const Orders = () => {
  const orders = [
    {
      id: '#ORD-001',
      product: 'Wireless Headphones',
      date: '2023-06-15',
      status: 'Processing'
    },
    {
      id: '#ORD-002',
      product: 'Smart Watch',
      date: '2023-06-18',
      status: 'Shipped'
    },
    {
      id: '#ORD-003',
      product: 'Running Shoes',
      date: '2023-06-20',
      status: 'Delivered'
    },
    {
      id: '#ORD-004',
      product: 'Backpack',
      date: '2023-06-22',
      status: 'Received'
    }
  ];

  return (
    <div className="orders-page">
      <h2 className="page-title">
        <List className="title-icon" /> My Orders
      </h2>

      <div className="orders-container">
        <div className="orders-header">
          <div className="header-item product">Product</div>
          <div className="header-item date">Order Date</div>
          <div className="header-item status">Status</div>
          <div className="header-item actions">Actions</div>
        </div>

        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-product">
              <div className="product-name">{order.product}</div>
              <div className="order-id">{order.id}</div>
            </div>
            
            <div className="order-date">{order.date}</div>
            
            <div className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </div>
            
            <div className="order-actions">
              <button className={`action-btn ${order.status === 'Processing' ? 'active' : ''}`}>
                <House className="btn-icon" /> 
              </button>
              <button className={`action-btn ${order.status === 'Shipped' ?   'active' : ''}`}>
                <Truck className="btn-icon" /> 
              </button>
              <button className={`action-btn ${order.status === 'Delivered' ? 'active' : ''}`}>
                <CheckCircle className="btn-icon" /> 
              </button>
              <button className={`action-btn ${order.status === 'Received' ? 'active' : ''}`}>
                <BoxArrowInDown className="btn-icon" /> 
              </button>

            </div>
            <div class="arrow-container">
  <div class="arrow-body">Your dynamic content here</div>
  <div class="arrow-head"></div>
</div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;