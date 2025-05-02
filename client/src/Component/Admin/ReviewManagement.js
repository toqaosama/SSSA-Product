import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import './AdminSetting/Style/Tables.css';
import authApi from '../../api/authApi';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const REVIEWS_PER_PAGE = 10;

// --- Helper function to format date ---
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (e) {
    console.error("Error formatting date:", e); // Log the error
    return 'Invalid Date';
  }
};

// --- Review Table Row ---
const ReviewRow = ({ review, onDelete, onToggleActivate }) => {
  return (
      <tr>
        <td>{review.id}</td>
        <td>{review.userName || `User ID: ${review.user_id}`}</td>
        <td>{review.productName || `Product ID: ${review.product_id}`}</td>
        <td>{review.rate} / 5</td>
        <td title={review.comment} className="comment-cell">{review.comment}</td>
        <td>
        <span className={`status-badge ${review.isActive ? 'active' : 'inactive'}`}>
          {review.isActive ? "Active" : "Inactive"}
        </span>
        </td>
        <td>{formatDate(review.createdAt || review.created_at)}</td>
        <td>
          <div className="d-flex gap-2"> {/* Use Bootstrap's d-flex and gap utilities */}
            <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(review.id)}
            >
              Delete
            </Button>
            <Button
                variant={review.isActive ? "warning" : "success"}
                size="sm"
                onClick={() => onToggleActivate(review)}
            >
              {review.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </td>
      </tr>
  );
};

// --- Review Table ---
const ReviewTable = ({ data, onDelete, onToggleActivate }) => {
  return (
      <Table hover responsive className='data-table'>
        <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Product</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No reviews found</td>
            </tr>
        ) : (
            data.map((review) => (
                <ReviewRow
                    key={review.id}
                    review={review}
                    onDelete={onDelete}
                    onToggleActivate={onToggleActivate}
                />
            ))
        )}
        </tbody>
      </Table>
  );
};

// --- Main Reviews Management Component ---
const ReviewsManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Load Reviews Data ---
  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.get("/review/");
      const fetchedReviews = res.data.reviews || res.data || [];
      const processedReviews = fetchedReviews.map((r) => ({
        ...r,
        isActive: !!r.isActive,
      }));
      setReviews(processedReviews);
    } catch (e) {
      console.error("Error loading reviews:", e);
      setError("Failed to load reviews. Please try again later.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // --- Filtering Logic ---
  const filteredReviews = reviews.filter((review) =>
      activeTab === 'active' ? review.isActive : activeTab === 'inactive' ? !review.isActive : true
  );

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const currentData = filteredReviews.slice(
      (currentPage - 1) * REVIEWS_PER_PAGE,
      currentPage * REVIEWS_PER_PAGE
  );

  // --- Action Handlers ---
  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    setError(null);
    try {
      await authApi.delete(`/review/${reviewId}/`);
      setReviews(prev => prev.filter((r) => r.id !== reviewId));
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (e) {
      console.error("Failed to delete review:", e);
      setError(`Failed to delete review (ID: ${reviewId}).`);
    }
  };

  const handleToggleActivate = async (review) => {
    setError(null);
    const action = review.isActive ? 'deactivate' : 'activate';
    try {
      await authApi.post(`/review/${review.id}/${action}/`);
      review.isActive = !review.isActive;
      setReviews(prev=>
          prev.map((r, key) => r.id === review.id ? review : r)
      );
    } catch (e) {
      console.error(`Failed to ${action} review:`, e);
      setError(`Failed to ${action} review (ID: ${review.id}).`);
    }
  };

  // --- Render Component ---
  return (
      <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
        <div className='content-container'>
          {/* Header and Tabs */}
          <div className='nav-tabs'>
            <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5>Review Management</h5>
            </div>
            <div className='nav-tabs-container'>
              {/* Tabs for filtering */}
              {['all', 'active', 'inactive'].map((tab) => (
                  <button
                      key={tab}
                      className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(tab);
                        setCurrentPage(1);
                      }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
              ))}
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
              <LoadingSpinner />
          )}
          {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
          )}

          {/* Table and Pagination */}
          {!loading && !error && (
              <div className='data-table-container mt-3'>
                <ReviewTable
                    data={currentData}
                    onDelete={handleDelete}
                    onToggleActivate={handleToggleActivate}
                />
                {totalPages > 0 && (
                    <div className='table-pagination'>
                <span>
                  Showing {(currentPage - 1) * REVIEWS_PER_PAGE + 1} to {Math.min(currentPage * REVIEWS_PER_PAGE, filteredReviews.length)} of {filteredReviews.length} entries
                </span>
                      <div className='pagination-controls d-flex gap-2'>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        {[...Array(totalPages)].map((_, i) => (
                            <Button
                                key={i + 1}
                                variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
                                size="sm"
                                onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
  );
};

export default ReviewsManagement;
