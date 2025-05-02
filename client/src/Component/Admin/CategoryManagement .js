import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Form, Modal, Image } from 'react-bootstrap';
import './AdminSetting/Style/Tables.css';
import authApi from '../../api/authApi';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CategoryRow = ({ category, onEdit, onDelete }) => {
  const imageUrl = category.img ? `${process.env.REACT_APP_API_URL}/uploads/${category.img}` : 'https://via.placeholder.com/50';
  return (
      <tr>
        <td>{category.id}</td>
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
                src={imageUrl}
                alt={category.name}
                width={50}
                height={50}
                rounded
                className="mr-2"
            />
          </div>
        </td>
        <td>{category.name}</td>
        <td>{category.desc}</td> {/* Display the description */}
        <td>{category.products || 0}</td>
        <td>
          <button className='action-btn edit' onClick={() => onEdit(category)}>Edit</button>
          <button className='action-btn delete' onClick={() => onDelete(category.id)}>Delete</button>
        </td>
      </tr>
  );
};

const CategoryTable = ({ data, onEdit, onDelete }) => {
  return (
      <table className='data-table'>
        <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th> {/* Added Description header */}
          <th>Products</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No categories found</td> {/* Updated colspan */}
            </tr>
        ) : (
            data.map((category) => (
                <CategoryRow
                    key={category.id}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))
        )}
        </tbody>
      </table>
  );
};

export const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState(''); // New state for description
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.get('/category');
      if (response.data && response.data.categories) {
        setCategories(response.data.categories);
      }
      else {
        setCategories([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    const formData = new FormData();
    formData.append('name', newCategoryName);
    formData.append('desc', newCategoryDescription); // Send the description
    if (newCategoryImage) {
      formData.append('image', newCategoryImage);
    }

    try {
      await authApi.post('/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowAddModal(false);
      setNewCategoryName('');
      setNewCategoryDescription(''); // Clear the description state
      setNewCategoryImage(null);
      await fetchData();
    } catch (error) {
      console.error("Add category error", error);
      setError("Failed to add category");
    }
  };

  const handleEditCategory = async (category) => {
    setEditCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.desc || ''); // Populate description for editing
    setShowAddModal(true);
  };

  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required.");
      return;
    }
    const formData = new FormData();
    formData.append('name', newCategoryName);
    formData.append('desc', newCategoryDescription); // Send the updated description
    if (newCategoryImage) {
      formData.append('image', newCategoryImage);
    }
    try {
      await authApi.put(`/category/${editCategory.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowAddModal(false);
      setNewCategoryName('');
      setNewCategoryDescription(''); // Clear the description state
      setNewCategoryImage(null);
      setEditCategory(null);
      await fetchData();
    } catch (error) {
      console.error("Update category error", error);
      setError("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;
    setError(null);
    try {
      await authApi.delete(`/category/${id}`);
      setCategories(prev => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Delete category error", error);
      setError(`Failed to delete category (ID: ${id}).`);
    }
  };

  const currentData = categories;

  return (
      <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
        <div className='content-container'>
          <div className='nav-tabs'>
            <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5>Category Management</h5>
              <div className='tab-actions'>
                <button className='btn btn-primary' onClick={() => {
                  setEditCategory(null);
                  setNewCategoryName('');
                  setNewCategoryDescription(''); // Clear description on add new
                  setNewCategoryImage(null);
                  setShowAddModal(true);
                }}>
                  <i className="bi bi-plus-lg"></i>
                  Add New Category
                </button>
              </div>
            </div>
          </div>

          {loading ? (
              <LoadingSpinner />
          ) : error ? (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
          ) : (
              <div className='data-table-container'>
                <CategoryTable
                    data={currentData}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                />
                {currentData.length > 0 && (
                    <div className='table-pagination'>
                <span>
                  Showing 1 to {currentData.length} of {categories.length} entries
                </span>
                    </div>
                )}
              </div>
          )}
        </div>

        <Modal show={showAddModal} onHide={() => {
          setShowAddModal(false);
          setEditCategory(null);
          setNewCategoryName('');
          setNewCategoryDescription(''); // Clear description on modal close
          setNewCategoryImage(null);
        }}>
          <Modal.Header closeButton>
            <Modal.Title>{editCategory ? "Edit Category" : "Add New Category"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formCategoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCategoryDescription"> {/* New form group for description */}
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter category description"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCategoryImage">
                <Form.Label>Category Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategoryImage(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => {
              setShowAddModal(false);
              setEditCategory(null);
              setNewCategoryName('');
              setNewCategoryDescription(''); // Clear description on cancel
              setNewCategoryImage(null);
            }}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={editCategory ? handleUpdateCategory : handleAddCategory}>
              {editCategory ? "Update" : "Add"}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default CategoryManagement;