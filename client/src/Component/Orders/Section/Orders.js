import React from 'react';
import { 
  House, 
  Truck, 
  CheckCircle, 
  BoxArrowInDown,
  List
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

  const getStatusIndex = (status) => {
    const statusOrder = ['Processing', 'Shipped', 'Delivered', 'Received'];
    return statusOrder.indexOf(status);
  };

  return (
    <div className="orders-page">


      <div className="orders-container">
        <div className="orders-header">
          <div className="header-item product">Product</div>
          <div className="header-item date">Order Date</div>
          <div className="header-item status">Status</div>
          <div className="header-item actions">Actions</div>
        </div>

        {orders.map((order, index) => {
          const statusIndex = getStatusIndex(order.status);
          
          return (
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
                <div className="status-tracker">
                  <div className={`tracker-step ${statusIndex >= 0 ? 'active' : ''}`}>
                    <div className="step-icon-container">
                      <House className="step-icon" />
                    </div>
                    <div className="step-label">Processing</div>
                  </div>
                  
                  <div className={`tracker-connector ${statusIndex >= 1 ? 'active' : ''}`}></div>
                  
                  <div className={`tracker-step ${statusIndex >= 1 ? 'active' : ''}`}>
                    <div className="step-icon-container">
                      <Truck className="step-icon" />
                    </div>
                    <div className="step-label">Shipped</div>
                  </div>
                  
                  <div className={`tracker-connector ${statusIndex >= 2 ? 'active' : ''}`}></div>
                  
                  <div className={`tracker-step ${statusIndex >= 2 ? 'active' : ''}`}>
                    <div className="step-icon-container">
                      <CheckCircle className="step-icon" />
                    </div>
                    <div className="step-label">Delivered</div>
                  </div>
                  
                  <div className={`tracker-connector ${statusIndex >= 3 ? 'active' : ''}`}></div>
                  
                  <div className={`tracker-step ${statusIndex >= 3 ? 'active' : ''}`}>
                    <div className="step-icon-container">
                      <BoxArrowInDown className="step-icon" />
                    </div>
                    <div className="step-label">Received</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
