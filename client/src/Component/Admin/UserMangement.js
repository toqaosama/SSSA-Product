import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AdminSetting/Style/Tables.css';
import authApi from '../../api/authApi';

const USERS_PER_PAGE = 10;

const TableRow = ({ user, onEdit, onDelete, onToggleActivate }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td><span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>{user.isActive ? "Active" : "Inactive"}</span></td>
    <td>{user.role}</td>
    <td>
      <button className='action-btn edit' onClick={() => onEdit(user)}>Edit</button>
      <button className='action-btn delete' onClick={() => onDelete(user.id)}>Delete</button>
      <button className='action-btn toggle' onClick={() => onToggleActivate(user)}>
        {user.isActive ? 'Deactivate' : 'Activate'}
      </button>
    </td>
  </tr>
);

const UserTable = ({ data, onEdit, onDelete, onToggleActivate }) => (
  <table className='data-table'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Status</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td colSpan="7" className="text-center">No users found</td>
        </tr>
      ) : (
        data.map(user => (
          <TableRow 
            key={user.id} 
            user={user} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            onToggleActivate={onToggleActivate} 
          />
        ))
      )}
    </tbody>
  </table>
);


const Tables = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);
  const [validated, setValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadUsers = async () => {
    try {
      const res = await authApi.get("/users/");
      setUsers(res.data.users);
    } catch (e) {
      alert("Error loading users");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    activeTab === 'active' ? user.isActive :
    activeTab === 'deactive' ? !user.isActive : true
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentData = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setFormData({ name: '', email: '', phone: '', password: '', role: 'user' });
    setValidated(false);
    setShowAddModal(true);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await authApi.post("/users/", formData);
      setUsers([...users, res.data.user]);
      setShowAddModal(false);
    } catch (e) {
      alert("Failed to add user");
      console.error(e);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    setValidated(false);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await authApi.put(`/users/${editingUser.id}/`, {...formData, isActive:editingUser.isActive});
      const updatedUsers = users.map(u => u.id === editingUser.id ? res.data.user : u);
      setUsers(updatedUsers);
      setShowEditModal(false);
      setEditingUser(null);
    } catch (e) {
      alert("Failed to update user");
      console.error(e);
    }
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
  
    try {
      await authApi.delete(`/users/${userId}/`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (e) {
      alert("Failed to delete user.");
      console.error(e);
    }
  };
  

  const handleToggleActivate = async (user) => {
    try {
      const updatedUser = { ...user, isActive: !user.isActive }; // Toggle the isActive status
      const res = await authApi.put(`/users/${user.id}/`, updatedUser);
      const updatedUsers = users.map(u => u.id === user.id ? res.data.user : u);
      setUsers(updatedUsers); // Update the state with the new user data
    } catch (e) {
      alert("Failed to toggle user activation");
      console.error(e);
    }
  };
  

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setValidated(false);
  };

  return (
    <div className='admin-content' style={{ padding: '20px', width: '100%' }}>
      <div className='content-container'>
        <div className='nav-tabs'>
          <div className='nav-tabs-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h5>User Management</h5>
            <div className='tab-actions'>
              <button className='btn btn-primary' onClick={handleAdd}>Add New</button>
            </div>
          </div>
          <div className='nav-tabs-container'>
            {['all', 'active', 'deactive'].map(tab => (
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

        <div className='data-table-container'>
          {loading ? (
            <div className="spinner-container text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <UserTable data={currentData} onEdit={handleEdit} onDelete={handleDelete} onToggleActivate={handleToggleActivate} />
              <div className='table-pagination'>
                <span>
                  Showing {(currentPage - 1) * USERS_PER_PAGE + 1} to {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} entries
                </span>
                <div className='pagination-controls'>
                  <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={currentPage === i + 1 ? 'active' : ''}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleAddUser}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control required name="name" value={formData.name} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" value={formData.email} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control required pattern="^[0-9]{6,}$" name="phone" value={formData.phone} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Phone number must contain at least 6 digits.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" minLength={6} value={formData.password} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button variant="primary" type="submit">Add</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleUpdateUser}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control required name="name" value={formData.name} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" value={formData.email} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control required pattern="^[0-9]{6,}$" name="phone" value={formData.phone} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Phone number must contain at least 6 digits.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button variant="primary" type="submit">Update</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tables;
