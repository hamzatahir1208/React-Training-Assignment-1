import { useState } from "react";

function UserModal({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd(formData);

    setFormData({
      name: "",
      email: "",
      role: ""
    });

    document.getElementById("userModalClose").click();
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
            <h5 className="modal-title">
              Add User
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Role
                </label>

                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Role
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                  <option value="User">
                    User
                  </option>
                </select>
              </div>

            </div>

            <div className="modal-footer">

              <button
                id="userModalClose"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Add User
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default UserModal;