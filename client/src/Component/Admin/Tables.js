import React from 'react';
import './AdminSetting/Style/Tables.css';

const Tables = () => {
  return (
    <div className='admin-dashboard-container'>
      <div className='admin-sidebar'>
        <h5 className='sidebar-title'>ADMIN DASHBOARD</h5>
        <div className='sidebar-menu'>
          <a href="#" className='menu-item'>Orders</a>
          <a href="#" className='menu-item'>Products</a>
          <a href="#" className='menu-item'>Categories</a>
          <a href="#" className='menu-item'>Manage Users</a>
          <a href="#" className='menu-item'>Offers</a>
          <a href="#" className='menu-item'>Reviews</a>
          <a href="#" className='menu-item'>Payment Methods</a>
        </div>
      </div>

      <div className='admin-content'>
        <div className='content-container'>
          <div className='nav-tabs'>
            <div className='nav-tabs-header'>
              <h5>User Management</h5>
              <div className='tab-actions'>
                <button className='btn btn-primary'>Add New</button>
              </div>
            </div>
            <div className='nav-tabs-container'>
              <a className='nav-tab active'>All</a>
              <a className='nav-tab'>Active</a>
              <a className='nav-tab'>Deactive</a>
            </div>
          </div>

          <div className='data-table-container'>
            <table className='data-table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td><span className='status-badge active'>Active</span></td>
                  <td>Admin</td>
                  <td>
                    <button className='action-btn edit'>Edit</button>
                    <button className='action-btn delete'>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td><span className='status-badge inactive'>Inactive</span></td>
                  <td>User</td>
                  <td>
                    <button className='action-btn edit'>Edit</button>
                    <button className='action-btn delete'>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className='table-pagination'>
              <span>Showing 1 to 2 of 2 entries</span>
              <div className='pagination-controls'>
                <button disabled>Previous</button>
                <button className='active'>1</button>
                <button>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;