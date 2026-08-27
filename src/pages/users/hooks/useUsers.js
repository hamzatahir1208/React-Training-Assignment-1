import { useCallback, useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../services/userService";


export function useUsers(options = {}) {
  const { page = 1, limit = 10, search = "", sortBy = "firstName", sortOrder = "asc" } = options;

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getUsers({ page, limit, search, sortBy, sortOrder });

      if (Array.isArray(result)) {
        setUsers(result);
        setTotal(result.length);
      } else {
        setUsers(result.users ?? []);
        setTotal(result.total ?? 0);
      }
    } catch (err) {
      setError(err.message ?? "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sortBy, sortOrder]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAddUser = async (newUser) => {
    try {
      await addUser(newUser);
      await loadUsers();
    } catch {
      const user = { id: Date.now(), ...newUser };
      setUsers((current) => [...current, user]);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch {
      setUsers((current) => current.filter((user) => user.id !== id));
    }
  };

  return { users, total, loading, error, handleAddUser, handleDeleteUser, reload: loadUsers };
}
