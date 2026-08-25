import Layout from "../layouts/Layout";
import Table from "../components/Table";
import UserModal from "../components/UserModal";

import { getUsers } from "../services/userService";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();

      setUsers(data);
    };

    loadUsers();
  }, []);

  const handleAddUser = (newUser) => {

    const user = {
      id: Date.now(),
      ...newUser
    };

    setUsers((currentUsers) => [
      ...currentUsers,
      user
    ]);
  };

  const handleDeleteUser = (id) => {
    setUsers((currentUsers) => {
      return currentUsers.filter((user) => user.id != id);
    });
  };

  return (
    <Layout>
      <div className=" dashboard p-5">
        <div className="content p-3">
          <h1>Dashboard</h1>
          <button
            type="button"
            className="btn "
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
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select input-feild"
              value={sortField}
              onChange={(e) =>
                setSortField(e.target.value)
              }
            >
              <option value="name">
                Name
              </option>

              <option value="email">
                Email
              </option>

              <option value="age">
                Age
              </option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select input-feild"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
            >
              <option value="asc">
                Ascending
              </option>

              <option value="desc">
                Descending
              </option>
            </select>
          </div>

        </div>
        <div className="mt-3">
          <Table
            data={users}
            handleDelete={handleDeleteUser}
            searchTerm={searchTerm}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>
      </div>

      <UserModal onAdd={handleAddUser} />
    </Layout>
  );
}