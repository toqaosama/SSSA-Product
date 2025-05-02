import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../../api/authApi'; // Import your authApi
import './Style/Profile.css';
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authApi.get('/auth/user');
        if (response.data?.user) {
          setUser(response.data.user);
          // Initialize form data with user data
          setFormData({
            name: response.data.user.name || '',
            email: response.data.user.email || '',
            phone: response.data.user.phone || '',
            role: response.data.user.role || ''
          });
        } else {
          setError('User data not found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare the data to send to the API.
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      // Make the API call to update the profile.  Use the correct endpoint.
      const response = await authApi.put('/users/'+user.id, updateData); // Change this endpoint
      if (response.status === 200) {
        // Update the user state with the new data.
        setUser(prevUser => ({...prevUser, ...updateData}));
        alert('Profile updated successfully!'); // Replace with a better notification
      } else {
        setError('Failed to update profile.');
      }

    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    navigate('/resetpassword'); // Use navigate to go to the reset password page
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading indicator
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Show error message
  }

  if (!user) {
    return <div>No user data available.</div>; // Handle case where user is still null
  }

  return (
      <div className='profile-page-container'>
        <div className='profile-content'>
          <form className='profile-form' onSubmit={handleSubmit}>
            <h2 className='profile-form-title'>Profile Details</h2>

            <div className='profile-form-group'>
              <label>Name</label>
              <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your name'
                  className='profile-form-input'
              />
            </div>

            <div className='profile-form-group'>
              <label>Email</label>
              <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className='read-only-input'
                  readOnly // Email is often not editable
              />
            </div>

            <div className='profile-form-group'>
              <label>Phone Number</label>
              <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Enter your phone number'
                  className='profile-form-input'
              />
            </div>
            {user.role === 'admin' && (
                <div className='profile-form-group'>
                  <label>Role</label>
                  <input
                      type='text'
                      name='role'
                      value={formData.role}
                      onChange={handleChange}
                      placeholder='Enter your role'
                      className='profile-form-input'
                      readOnly
                  />
                </div>
            )}

            <div className='profile-form-actions'>
              <button type='button' className='profile-cancel-button'>
                Cancel
              </button>
              <button type='submit' className='profile-save-button' disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                  type='button'
                  className='profile-reset-password-button' //apply style
                  onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Profile;
