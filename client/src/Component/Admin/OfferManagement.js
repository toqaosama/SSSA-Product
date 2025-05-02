import React, { useState, useEffect } from 'react';
import authApi from '../../api/authApi'; // Import your axios instance
import { Button, Modal, Form, Table, Badge } from 'react-bootstrap';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Import Bootstrap components

// Safe rendering helper function
const safeRender = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return value;
  return String(value);
};

const OfferRow = ({ offer, onEdit, onDelete }) => {
  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle product display based on offer type
  const renderProductBadges = () => {
    // Check if the offer is for all products
    if (offer.is_all) {
      return <Badge bg="dark">All Products</Badge>;
    }

    // If it's category-based, determine by checking if all products have the same category_id
    const products = offer.products || [];
    if (products.length > 0) {
      // Get unique categories from products
      const categories = new Set();
      products.forEach(product => {
        if (product.category_id) {
          categories.add(product.category_id);
        }
      });

      // If there's only one category and more than one product, likely a category offer
      if (categories.size === 1 && products.length > 1) {
        // Try to get category name from first product
        const categoryName = products[0].name;
        return <Badge bg="success">Category [{categoryName}]</Badge>;
      }

      // Otherwise it's a specific products offer
      // Limit to first 5 products
      const displayCount = Math.min(5, products.length);
      const remaining = products.length - displayCount;

      return (
          <div className="product-badges">
            {products.slice(0, displayCount).map((p, index) => (
                <Badge
                    key={p.id || index}
                    bg="primary"
                    className="me-1 mb-1"
                >
                  {p.name}
                </Badge>
            ))}
            {remaining > 0 && (
                <Badge bg="secondary">+{remaining} more</Badge>
            )}
          </div>
      );
    }

    return <Badge bg="light" text="dark">No products</Badge>;
  };

  return (
      <tr>
        <td>{safeRender(offer.id)}</td>
        <td>{safeRender(offer.name || offer.offer_name)}</td>
        <td>{safeRender(offer.discount || offer.percentage)}%</td>
        <td>{formatDate(offer.startDate || offer.start_date)}</td>
        <td>{formatDate(offer.endDate || offer.end_date)}</td>
        <td>{renderProductBadges()}</td>
        <td>
          <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(offer)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(offer.id)}>Delete</Button>
        </td>
      </tr>
  );
};

const OfferTable = ({ data, refreshData, onEdit }) => {
  const handleDelete = async (id) => {
    try {
      await authApi.delete(`/offers/${id}/delete`);
      console.log('Offer deleted');
      refreshData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  // Ensure data is a valid array and filter out any non-object items
  const offersArray = Array.isArray(data)
      ? data.filter(item => item && typeof item === 'object')
      : [];

  return (
      <Table striped bordered hover responsive>
        <thead>
        <tr>
          <th>ID</th>
          <th>Offer Name</th>
          <th>Discount</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Products</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {offersArray.map((offer, index) => (
            <OfferRow
                key={offer.id || index}
                offer={offer}
                onEdit={onEdit}
                onDelete={handleDelete}
            />
        ))}
        </tbody>
      </Table>
  );
}

const OfferManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [newOffer, setNewOffer] = useState({
    offer_name: '',
    offer_description: '',
    percentage: '',
    type: '',
    start_date: '',
    end_date: '',
    category_id: '',
    product_ids: []
  });
  const [editingOffer, setEditingOffer] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Safe rendering helper function
  const safeRender = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return value;
    return String(value);
  };

  // Format date string for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Fetch all offers
  const fetchOffers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.get('/offers');

      // Process the response to ensure we have a valid array
      let processedData;

      if (!res.data) {
        processedData = [];
      } else if (Array.isArray(res.data)) {
        processedData = res.data;
      } else if (res.data.offers && Array.isArray(res.data.offers)) {
        processedData = res.data.offers;
      } else if (typeof res.data === 'object') {
        // If data is an object but not an array, wrap it in an array
        processedData = [res.data];
      } else {
        processedData = [];
      }

      // Ensure all items in the array are objects
      const validData = processedData.filter(item => item && typeof item === 'object');
      setCurrentData(validData);

      console.log('Processed offer data:', validData);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      setError('Failed to load offers. Please try again.');
      setCurrentData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchOffers();
  }, []);

  // Load categories and products when modal opens
  useEffect(() => {
    if (showAddModal || showEditModal) {
      const fetchCategoriesAndProducts = async () => {
        try {
          const [categoriesRes, productsRes] = await Promise.all([
            authApi.get('/category'),
            authApi.get('/products')
          ]);

          // Process category data
          const categories = categoriesRes.data && categoriesRes.data.categories
              ? categoriesRes.data.categories
              : Array.isArray(categoriesRes.data)
                  ? categoriesRes.data
                  : [];

          // Process product data
          const products = productsRes.data && productsRes.data.products
              ? productsRes.data.products
              : Array.isArray(productsRes.data)
                  ? productsRes.data
                  : [];

          setCategoryData(categories);
          setProductData(products);
        } catch (error) {
          console.error('Error fetching categories/products:', error);
          setError('Failed to load categories or products.');
        }
      };

      fetchCategoriesAndProducts();
    }
  }, [showAddModal, showEditModal]);

  // Handle form field changes for new offer
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer(prev => ({ ...prev, [name]: value }));
  };

  // Handle form field changes for editing offer
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOffer(prev => ({ ...prev, [name]: value }));
  };

  // Handle product selection (multiple select) for new offer
  const handleProductSelect = (e) => {
    const selectedOptions = [...e.target.selectedOptions];
    const selectedValues = selectedOptions.map(option => option.value);
    setNewOffer(prev => ({ ...prev, product_ids: selectedValues }));
  };

  // Handle product selection (multiple select) for editing offer
  const handleEditProductSelect = (e) => {
    const selectedOptions = [...e.target.selectedOptions];
    const selectedValues = selectedOptions.map(option => option.value);
    setEditingOffer(prev => ({ ...prev, product_ids: selectedValues }));
  };

  // Submit new offer
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create the request body according to API expectations
      const requestBody = {
        offer_name: newOffer.offer_name,
        offer_description: newOffer.offer_description,
        percentage: newOffer.percentage,
        type: newOffer.type,
        start_date: newOffer.start_date,
        end_date: newOffer.end_date
      };

      // Add type-specific fields
      if (newOffer.type === 'category') {
        requestBody.category_id = newOffer.category_id;
      } else if (newOffer.type === 'products') {
        requestBody.product_ids = newOffer.product_ids;
      }

      console.log('Submitting offer data:', requestBody);

      // Send the request
      const response = await authApi.post('/offers/create', requestBody);
      console.log('API response:', response.data);

      // Reset form and close modal
      setNewOffer({
        offer_name: '',
        offer_description: '',
        percentage: '',
        type: '',
        start_date: '',
        end_date: '',
        category_id: '',
        product_ids: []
      });
      setShowAddModal(false);

      // Refresh the offers list
      fetchOffers();

    } catch (error) {
      console.error('Error creating offer:', error);
      setError('Failed to create offer. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening edit modal with offer data
  const handleEdit = (offer) => {
    console.log('Editing offer:', offer);

    // Determine offer type
    let offerType = 'products';
    if (offer.is_all) {
      offerType = 'all';
    } else if (offer.products && offer.products.length > 0) {
      // Check if all products have the same category_id
      const categories = new Set();
      offer.products.forEach(product => {
        if (product.category_id) {
          categories.add(product.category_id);
        }
      });

      if (categories.size === 1 && offer.products.length > 1) {
        offerType = 'category';
      }
    }

    // Extract product_ids from products
    const productIds = offer.products ? offer.products.map(p => p.id?.toString()) : [];

    // Extract category_id (if it's a category offer)
    const categoryId = offerType === 'category' && offer.products && offer.products.length > 0
        ? offer.products[0].category_id
        : '';

    // Set up editing offer object
    setEditingOffer({
      id: offer.id,
      offer_name: offer.offer_name || offer.name || '',
      offer_description: offer.offer_description || '',
      percentage: offer.percentage || offer.discount || '',
      type: offerType,
      start_date: formatDateForInput(offer.start_date || offer.startDate),
      end_date: formatDateForInput(offer.end_date || offer.endDate),
      category_id: categoryId,
      product_ids: productIds
    });

    setShowEditModal(true);
  };

  // Submit edited offer
  const handleUpdateOffer = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create the request body according to API expectations
      const requestBody = {
        offer_name: editingOffer.offer_name,
        offer_description: editingOffer.offer_description,
        percentage: editingOffer.percentage,
        type: editingOffer.type,
        start_date: editingOffer.start_date,
        end_date: editingOffer.end_date
      };

      // Add type-specific fields
      if (editingOffer.type === 'category') {
        requestBody.category_id = editingOffer.category_id;
      } else if (editingOffer.type === 'products') {
        requestBody.product_ids = editingOffer.product_ids;
      }

      console.log('Updating offer data:', requestBody);

      // Send the request
      const response = await authApi.put(`/offers/${editingOffer.id}/update`, requestBody);
      console.log('API response:', response.data);

      // Reset form and close modal
      setEditingOffer(null);
      setShowEditModal(false);

      // Refresh the offers list
      fetchOffers();

    } catch (error) {
      console.error('Error updating offer:', error);
      setError('Failed to update offer. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when modal closes
  const handleCloseModal = () => {
    setNewOffer({
      offer_name: '',
      offer_description: '',
      percentage: '',
      type: '',
      start_date: '',
      end_date: '',
      category_id: '',
      product_ids: []
    });
    setError(null);
    setShowAddModal(false);
  };

  // Reset form when edit modal closes
  const handleCloseEditModal = () => {
    setEditingOffer(null);
    setError(null);
    setShowEditModal(false);
  };

  return (
      <div className='admin-content'>
        <div className='content-container'>
          <div className='nav-tabs'>
            <div className='nav-tabs-header'>
              <h5>Offer Management</h5>
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                Add New Offer
              </Button>
            </div>
          </div>

          <div className='data-table-container'>
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-danger">{error}</p>}
            {!isLoading && currentData.length === 0 && !error && (
                <p>No offers found. Create a new offer to get started.</p>
            )}
            {!isLoading && currentData.length > 0 && (
                <OfferTable
                    data={currentData}
                    refreshData={fetchOffers}
                    onEdit={handleEdit}
                />
            )}
          </div>
        </div>

        {/* Add Offer Modal */}
        <Modal show={showAddModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add New Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <p className="text-danger">{error}</p>}
            <Form>
              <Form.Group className="mb-3" controlId="offerName">
                <Form.Label>Offer Name</Form.Label>
                <Form.Control
                    type="text"
                    name="offer_name"
                    placeholder="Enter offer name"
                    value={newOffer.offer_name}
                    onChange={handleInputChange}
                    required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="offerDescription">
                <Form.Label>Offer Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="offer_description"
                    placeholder="Enter description"
                    value={newOffer.offer_description}
                    onChange={handleInputChange}
                    required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="percentage">
                <Form.Label>Discount Percentage</Form.Label>
                <Form.Control
                    type="number"
                    name="percentage"
                    placeholder="Enter discount percentage"
                    value={newOffer.percentage}
                    onChange={handleInputChange}
                    required
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="start_date"
                        value={newOffer.start_date}
                        onChange={handleInputChange}
                        required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="end_date"
                        value={newOffer.end_date}
                        onChange={handleInputChange}
                        required
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Offer Type</Form.Label>
                <Form.Select
                    name="type"
                    value={newOffer.type}
                    onChange={handleInputChange}
                    required
                >
                  <option value="">Select Type</option>
                  <option value="category">Category</option>
                  <option value="products">Products</option>
                  <option value="all">All</option>
                </Form.Select>
              </Form.Group>

              {newOffer.type === 'category' && (
                  <Form.Group className="mb-3" controlId="categoryId">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select
                        name="category_id"
                        value={newOffer.category_id}
                        onChange={handleInputChange}
                        required
                    >
                      <option value="">Select a category</option>
                      {categoryData.map(category => (
                          <option key={category.id || Math.random()} value={category.id}>
                            {safeRender(category.name)}
                          </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
              )}

              {newOffer.type === 'products' && (
                  <Form.Group className="mb-3" controlId="productIds">
                    <Form.Label>Select Products</Form.Label>
                    <Form.Select
                        multiple
                        name="product_ids"
                        value={newOffer.product_ids}
                        onChange={handleProductSelect}
                        required
                        style={{ height: '200px' }}
                    >
                      {productData.map(product => (
                          <option key={product.id || Math.random()} value={product.id}>
                            {safeRender(product.name)}
                          </option>
                      ))}
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Hold Ctrl (or Cmd on Mac) to select multiple products
                    </Form.Text>
                  </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Offer Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <p className="text-danger">{error}</p>}
            {editingOffer && (
                <Form>
                  <Form.Group className="mb-3" controlId="editOfferName">
                    <Form.Label>Offer Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="offer_name"
                        placeholder="Enter offer name"
                        value={editingOffer.offer_name}
                        onChange={handleEditInputChange}
                        required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="editOfferDescription">
                    <Form.Label>Offer Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="offer_description"
                        placeholder="Enter description"
                        value={editingOffer.offer_description}
                        onChange={handleEditInputChange}
                        required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="editPercentage">
                    <Form.Label>Discount Percentage</Form.Label>
                    <Form.Control
                        type="number"
                        name="percentage"
                        placeholder="Enter discount percentage"
                        value={editingOffer.percentage}
                        onChange={handleEditInputChange}
                        required
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3" controlId="editStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="start_date"
                            value={editingOffer.start_date}
                            onChange={handleEditInputChange}
                            required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3" controlId="editEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="end_date"
                            value={editingOffer.end_date}
                            onChange={handleEditInputChange}
                            required
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3" controlId="editType">
                    <Form.Label>Offer Type</Form.Label>
                    <Form.Select
                        name="type"
                        value={editingOffer.type}
                        onChange={handleEditInputChange}
                        required
                    >
                      <option value="">Select Type</option>
                      <option value="category">Category</option>
                      <option value="products">Products</option>
                      <option value="all">All</option>
                    </Form.Select>
                  </Form.Group>

                  {editingOffer.type === 'category' && (
                      <Form.Group className="mb-3" controlId="editCategoryId">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select
                            name="category_id"
                            value={editingOffer.category_id}
                            onChange={handleEditInputChange}
                            required
                        >
                          <option value="">Select a category</option>
                          {categoryData.map(category => (
                              <option key={category.id || Math.random()} value={category.id}>
                                {safeRender(category.name)}
                              </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                  )}

                  {editingOffer.type === 'products' && (
                      <Form.Group className="mb-3" controlId="editProductIds">
                        <Form.Label>Select Products</Form.Label>
                        <Form.Select
                            multiple
                            name="product_ids"
                            value={editingOffer.product_ids}
                            onChange={handleEditProductSelect}
                            required
                            style={{ height: '200px' }}
                        >
                          {productData.map(product => (
                              <option key={product.id || Math.random()} value={product.id}>
                                {safeRender(product.name)}
                              </option>
                          ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                          Hold Ctrl (or Cmd on Mac) to select multiple products
                        </Form.Text>
                      </Form.Group>
                  )}
                </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button
                variant="primary"
                onClick={handleUpdateOffer}
                disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default OfferManagement;