import Layout from "../layouts/Layout";
import Table from "../components/Table";
import UserModal from "../components/UserModal";

import { getUsers } from "../services/userService";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [users, setUsers] = useState([]);
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
      <div className="container ">
        <div className="content mt-5 p-3">
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
        <div className="mt-5">
          <Table data={users} handelDelete={handleDeleteUser} />
        </div>
      </div>

      <UserModal onAdd={handleAddUser}/>
    </Layout>
  );
}