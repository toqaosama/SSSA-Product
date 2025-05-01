import React, { useState, useEffect } from 'react';
import authApi from '../../api/authApi';
import './AdminSetting/Style/Tables.css';
import { Modal, Button } from 'react-bootstrap';

const ProductRow = ({ product, onEdit, onDelete }) => (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>${parseFloat(product.price).toFixed(2)}</td>
      <td>
        {product.categoryName &&
            <span style={{
              backgroundColor: '#fff4e5',
              color: '#ff9800',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
          {product.categoryName}
        </span>
        }
      </td>
      <td>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {product.descriptions.map((desc, index) => (
              <span key={index} style={{
                backgroundColor: '#e0f3ff',
                color: '#007bff',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}>
            {desc.head}
          </span>
          ))}
        </div>
      </td>
      <td>
        {product.images?.[0]?.img ? (
            <img src={process.env.REACT_APP_API_URL+"/uploads/"+product.images[0].img} alt={product.name} style={{ width: '100px', height: '100px' }} />
        ) : (
            <span>No image</span>
        )}
      </td>
      <td>
        <button className="action-btn edit" onClick={() => onEdit(product)}>Edit</button>
        <button className="action-btn delete" onClick={() => onDelete(product.id)}>Delete</button>
      </td>
    </tr>
);

const ProductTable = ({ data, onEdit, onDelete }) => (
    <table className="data-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Descriptions</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {data.map(product => (
          <ProductRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
          />
      ))}
      </tbody>
    </table>
);

export const ProductManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', category_id: 0, descriptions: [], images: [] });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const resProducts = await authApi.get('/products');
      const resCategories = await authApi.get('/category');
      setProducts(resProducts.data.products);
      setCategories(resCategories.data.categories);
      console.log(resCategories.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category_id', formData.category_id);

    // Handle descriptions as objects with head and desc properties
    formData.descriptions.forEach((desc, index) => {
      formDataToSend.append(`descriptions[${index}][header]`, desc.head);
      formDataToSend.append(`descriptions[${index}][description]`, desc.desc);
    });

    // Append each image file
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image) => {
        formDataToSend.append('images', image); // 'images' can be the field name your backend expects for multiple files
      });
    }

    try {
      if (editingProduct) {
        await authApi.post(`/product/update/${editingProduct.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for sending files
          },
        });
      } else {
        await authApi.post('/product/create', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for sending files
          },
        });
      }
      setShowAddModal(false);
      setFormData({ name: '', price: '', category_id: 0, descriptions: [], images: [] });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category_id: product.category_id, // Make sure to include category_id
      descriptions: product.descriptions ? product.descriptions.map(desc => ({
        head: desc.head || '',
        desc: desc.desc || ''
      })) : [],
      images: [], // When editing, we might not want to pre-fill images for re-upload
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product ?");
    if(!ok) return;

    try {
      await authApi.post(`/product/delete/${id}`);
      setProducts(prev => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleDescriptionChange = (index, field, value) => {
    const updatedDescriptions = [...formData.descriptions];
    updatedDescriptions[index] = {
      ...updatedDescriptions[index],
      [field]: value
    };
    setFormData({ ...formData, descriptions: updatedDescriptions });
  };

  const handleAddDescription = () => {
    setFormData({
      ...formData,
      descriptions: [...formData.descriptions, { head: '', desc: '' }]
    });
  };

  const handleRemoveDescription = (index) => {
    const updatedDescriptions = formData.descriptions.filter((_, i) => i !== index);
    setFormData({ ...formData, descriptions: updatedDescriptions });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const currentData = products;
  const totalEntries = currentData.length;

  return (
      <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
        <div className='content-container' style={{ width: '100%' }}>
          <div className='nav-tabs'>
            <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5>Product Management</h5>
              <div className='tab-actions'>
                <button className='btn btn-primary' onClick={() => {
                  setShowAddModal(true);
                  setEditingProduct(null);
                  setFormData({ name: '', price: '', category_id: 0, descriptions: [], images: [] });
                }}>
                  Add New Product
                </button>
              </div>
            </div>

            <div className='nav-tabs-container'>
              <button className="nav-tab active">All</button>
            </div>
          </div>

          <div className='data-table-container' style={{ width: '100%', overflowX: 'auto' }}>
            <ProductTable data={currentData} onEdit={handleEdit} onDelete={handleDelete} />
            <div className='table-pagination' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <span>Showing 1 to {totalEntries} of {totalEntries} entries</span>
              <div className='pagination-controls'>
                <button disabled>Previous</button>
                <button className='active'>1</button>
                <button disabled={totalEntries <= 10}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap Modal for Add/Edit */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleAddOrEdit}>
              <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
              </div>
              <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    required
                />
              </div>
              <div className="mb-3">
                <select
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    value={formData.category_id}
                    className="form-control"
                >
                  <option value={0} disabled>Select Category</option>
                  {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                  ))}
                </select>
              </div>

              {/* Descriptions */}
              <div className="mb-3">
                <label>Descriptions</label>
                {formData.descriptions.map((desc, index) => (
                    <div key={index} className="mb-2">
                      <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            value={desc.head}
                            onChange={e => handleDescriptionChange(index, 'head', e.target.value)}
                            placeholder="Header"
                            required
                        />
                      </div>
                      <div className="input-group mb-2">
                        <textarea
                            className="form-control"
                            value={desc.desc}
                            onChange={e => handleDescriptionChange(index, 'desc', e.target.value)}
                            placeholder="Description"
                            required
                        />
                      </div>
                      <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveDescription(index)}
                      >
                        Remove
                      </button>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddDescription}>
                  Add Description
                </button>
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label>Images</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                    multiple
                />
              </div>

              <div className="d-flex justify-content-between">
                <Button type="submit" variant="success">
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
  );
};

export default ProductManagement;