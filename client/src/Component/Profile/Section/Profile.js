import React from 'react';
import './Style/Profile.css';

const Profile = () => {
    const userName = "User"; // This would come from your auth system
    
    return (
      <div className='profile-container'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <h3>Hello, {userName}</h3>
          </div>
          <div className='sidebar-item active'>
            <h3>Profile Details</h3>
          </div>
          <div className='sidebar-item'>
            <h3>Dashboard</h3>
          </div>
          <div className='sidebar-item'>
            <h3>Orders</h3>
          </div>
          <div className='sidebar-item'>
            <h3>Settings</h3>
          </div>
          <div className='sidebar-item signout'>
            <h3>Sign Out</h3>
          </div>
        </div>
        
        <div className='profile-content'>
          <form className='profile-form'>
            <h2 className='form-title'>Profile Details</h2>
            
            <div className='form-row'>
              <div className='form-group'>
                <label>First Name</label>
                <input 
                  type='text' 
                  placeholder='Enter your first name'
                  className='form-input'
                />
              </div>
              
              <div className='form-group'>
                <label>Last Name</label>
                <input 
                  type='text' 
                  placeholder='Enter your last name'
                  className='form-input'
                />
              </div>
            </div>
            
            <div className='form-group'>
              <label>Email</label>
              <input 
                type='email' 
                placeholder='Enter your email'
                className='form-input'
              />
            </div>
            
            <div className='form-row'>
              <div className='form-group'>
                <label>Date of Birth</label>
                <input 
                  type='date' 
                  className='form-input'
                />
              </div>
              
              <div className='form-group'>
                <label>Phone Number</label>
                <input 
                  type='tel' 
                  placeholder='Enter your phone number'
                  className='form-input'
                />
              </div>
            </div>
            
            <div className='form-group'>
              <label>Address</label>
              <textarea 
                placeholder='Enter your address'
                className='form-input'
                rows='3'
              />
            </div>
            
            <div className='form-actions'>
              <button type='button' className='cancel-button'>
                Cancel
              </button>
              <button type='submit' className='save-button'>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Profile;