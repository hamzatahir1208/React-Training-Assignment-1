import { useState } from "react";
import { Modal, Form, Button, Alert, Spinner } from "react-bootstrap";

const initialFormData = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  role: "",
};

export default function UserModal({ show, onHide, onSubmit, isAdding, error, setError }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleClose = () => {
    if (isAdding) return;
    setFormData(initialFormData);
    setError("");
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: Number(formData.age),
        email: formData.email.trim(),
        role: formData.role,
      });
      setFormData(initialFormData);
      onHide();
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop={isAdding ? "static" : true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!isAdding}>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && (
            <Alert variant="danger" className="py-2">
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="userFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isAdding}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isAdding}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={isAdding}
              min="1"
              max="120"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isAdding}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userRole">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isAdding}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isAdding}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isAdding}
            className="d-inline-flex align-items-center gap-2"
          >
            {isAdding ? (
              <>
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                <span>Adding...</span>
              </>
            ) : (
              "Add User"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
