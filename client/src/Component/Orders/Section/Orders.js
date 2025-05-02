import React, { useState, useEffect } from 'react';
// Removed unused icons as the status tracker is simplified
// import {
//   House,
//   Truck,
//   CheckCircle,
//   BoxArrowInDown,
//   List
// } from 'react-bootstrap-icons';
import './Stlye/Orders.css';
import authApi from '../../../api/authApi';
import {Badge} from "react-bootstrap";

const badge_per_status = {
  'waiting' : 'warning',
  'processing': 'info',
  'done':'success',
  'cancelled':'danger',
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      // Use the authApi axios instance to make a GET request to the specified endpoint
      const response = await authApi.get('/service-order/me');
      console.log(response.data.orders);
      setOrders(response.data.orders); // Update state with the orders array from the API response
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [authApi]); // Added authApi to dependency array if it could change, though typically it's stable

  if (loading) {
    return <div className="orders-page">Loading orders...</div>;
  }

  if (error) {
    // Display a more user-friendly error message
    return <div className="orders-page">Error loading orders. Please try again later.</div>;
  }

  return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <div className="header-item product">Service </div> {/* Changed label to match API data */}
            <div className="header-item date">Order Date</div>
            <div className="header-item status">Status</div>
            {/* <div className="header-item actions">Actions</div> */}
          </div>

          {orders.length === 0 ? (
              <div className="no-orders">No orders found.</div>
          ) : (
              orders.map((order) => {
                // Use order.id from the API response for the key
                return (
                    <div key={order.id} className="order-item">
                      <div className="order-product">
                        {/* Display product_id from API */}
                        <div className="product-name"> {order.productName}</div>
                        {/* Display order id from API */}
                        <div className="order-id">Order ID: #{order.id}</div>
                      </div>

                      {/* Display created_at from API */}
                      {/* Format date using toLocaleDateString for better readability */}
                      <div className="order-date">{new Date(order.created_at).toLocaleDateString()}</div>

                      {/* Display status from API. You might want to add classes based on status if needed */}
                      <Badge variant={badge_per_status[order.status]}>
                        {order.status}
                      </Badge>

                    </div>
                );
              })
          )}
        </div>
      </div>
  );
};

export default Orders;
