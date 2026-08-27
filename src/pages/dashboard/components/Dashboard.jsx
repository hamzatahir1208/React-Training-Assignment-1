import { useState } from "react";
import Layout from "../../../app/Layout";
import Table from "../../../components/Table";
import UserModal from "../../users/components/UserModal";
import { useUsers } from "../../users/hooks/useUsers";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField,  setSortField]  = useState("firstName");
  const [sortOrder,  setSortOrder]  = useState("asc");

  const {users, loading, error, handleAddUser, handleDeleteUser, } = useUsers({
    search:searchTerm,
    sortBy:sortField,
    sortOrder,
  });

  return (
    <Layout>
      <div className="dashboard p-5">

        <div className="content p-3">
          <h1>Dashboard</h1>
          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
          >
            <i className="bi bi-plus-circle text-light fs-2"></i>
          </button>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control input-feild"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select input-feild"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="age">Age</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select input-feild"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          {loading && (
            <div className="text-center text-light py-4">Loading users...</div>
          )}
          {error && (
            <div className="text-center text-danger py-4">{error}</div>
          )}
          {!loading && !error && (
            <Table
              data={users}
              handleDelete={handleDeleteUser}
              // searchTerm={searchTerm}
              // sortField={sortField}
              // sortOrder={sortOrder}
            />
          )}
        </div>

      </div>

      <UserModal onAdd={handleAddUser} />
    </Layout>
  );
}
