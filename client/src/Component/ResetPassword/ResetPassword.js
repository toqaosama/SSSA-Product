import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import '../Profile/Section/Style/Profile.css';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await authApi.post(`/auth/reset-password/`, {
                oldPassword,
                newPassword
            });

            if (response.status === 200) {
                setMessage(response.data.message || 'Password reset successfully. Redirecting to login...');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } else {
                setError(response.data.error || 'Failed to reset password.');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className='profile-page-container'>
            <div className='profile-content'>
                <form className='profile-form' onSubmit={handleSubmit}>
                    <h2 className='profile-form-title'>Reset Password</h2>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Old Password */}
                    <div className='profile-form-group'>
                        <label>Old Password</label>
                        <div className="input-group">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder='Enter your old password'
                                className='profile-form-input'
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                tabIndex={-1}
                            >
                                {showOldPassword ? <Eye /> : <EyeSlash />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className='profile-form-group'>
                        <label>New Password</label>
                        <div className="input-group">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='Enter your new password'
                                className='profile-form-input'
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                tabIndex={-1}
                            >
                                {showNewPassword ? <Eye /> : <EyeSlash />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className='profile-form-group'>
                        <label>Confirm New Password</label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm your new password'
                                className='profile-form-input'
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <Eye /> : <EyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className='profile-form-actions'>
                        <button type='button' className='profile-cancel-button' onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type='submit' className='profile-save-button' disabled={loading}>
                            {loading ? <LoadingSpinner /> : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
