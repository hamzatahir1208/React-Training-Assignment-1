import { useState } from "react";

export default function UserModal({ onAdd, isAdding: externalIsAdding }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    role: "",
  });
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = externalIsAdding || localSubmitting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLocalSubmitting(true);

    try {
      if (onAdd) {
        await onAdd({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          age: Number(formData.age),
          email: formData.email.trim(),
          role: formData.role,
        });
      }
      setFormData({ firstName: "", lastName: "", age: "", email: "", role: "" });
      const closeBtn = document.getElementById("userModalClose");
      if (closeBtn) {
        closeBtn.click();
      }
    } catch (err) {
      setErrorMessage(err?.message);
    } finally {
      setLocalSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="userModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add User</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              disabled={isSubmitting}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {errorMessage && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  min="1"
                  max="120"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                id="userModalClose"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={isSubmitting}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary d-inline-flex align-items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
