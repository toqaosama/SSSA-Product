import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Profile.css';
const Profile = () => {
  const userName = "User"; // This would come from your auth system

  return (
    <div className='profile-page-container'>


      <div className='profile-content'>
        <form className='profile-form'>
          <h2 className='profile-form-title'>Profile Details</h2>

          <div className='profile-form-row'>
            <div className='profile-form-group'>
              <label>First Name</label>
              <input
                type='text'
                placeholder='Enter your first name'
                className='profile-form-input'
              />
            </div>

            <div className='profile-form-group'>
              <label>Last Name</label>
              <input
                type='text'
                placeholder='Enter your last name'
                className='profile-form-input'
              />
            </div>
          </div>

          <div className='profile-form-group'>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='profile-form-input'
            />
          </div>

          <div className='profile-form-row'>
            <div className='profile-form-group'>
              <label>Date of Birth</label>
              <input
                type='date'
                className='profile-form-input'
              />
            </div>

            <div className='profile-form-group'>
              <label>Phone Number</label>
              <input
                type='tel'
                placeholder='Enter your phone number'
                className='profile-form-input'
              />
            </div>
          </div>

          <div className='profile-form-group'>
            <label>Address</label>
            <textarea
              placeholder='Enter your address'
              className='profile-form-input'
              rows='3'
            />
          </div>

          <div className='profile-form-actions'>
            <button type='button' className='profile-cancel-button'>
              Cancel
            </button>
            <button type='submit' className='profile-save-button'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;