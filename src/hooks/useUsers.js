import { useCallback, useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../services/userService";

export function useUsers(initialOptions = {}) {
  const [page, setPageState] = useState(initialOptions.page ?? 1);
  const [limit, setLimitState] = useState(initialOptions.limit ?? 10);
  const [search, setSearchState] = useState(initialOptions.search ?? "");
  const [sortBy, setSortByState] = useState(initialOptions.sortBy ?? "firstName");
  const [order, setOrderState] = useState(
    initialOptions.order ?? initialOptions.sortOrder ?? "asc"
  );

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getUsers({
        page,
        limit,
        search,
        sortBy,
        order,
      });

      if (Array.isArray(result)) {
        setUsers(result);
        setTotal(result.length);
      } else {
        setUsers(result?.users ?? []);
        setTotal(result?.total ?? 0);
      }
    } catch (err) {
      setError(err.message ?? "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sortBy, order]);

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getUsers({
          page,
          limit,
          search,
          sortBy,
          order,
        });

        if (!ignore) {
          if (Array.isArray(result)) {
            setUsers(result);
            setTotal(result.length);
          } else {
            setUsers(result?.users ?? []);
            setTotal(result?.total ?? 0);
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message ?? "Failed to load users.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [page, limit, search, sortBy, order]);

  const setPage = useCallback((newPage) => {
    setPageState((prev) => {
      const target = typeof newPage === "function" ? newPage(prev) : newPage;
      return Math.max(1, target);
    });
  }, []);

  const setLimit = useCallback((newLimit) => {
    setLimitState(Number(newLimit));
    setPageState(1);
  }, []);

  const setSearch = useCallback((term) => {
    setSearchState(term);
    setPageState(1);
  }, []);

  const setSort = useCallback((field) => {
    setSortByState((prevField) => {
      if (prevField === field) {
        setOrderState((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        setOrderState("asc");
      }
      return field;
    });
    setPageState(1);
  }, []);

  const setOrder = useCallback((newOrder) => {
    setOrderState(newOrder);
    setPageState(1);
  }, []);

  const setSortBy = useCallback((field) => {
    setSortByState(field);
    setPageState(1);
  }, []);

  const nextPage = useCallback(() => {
    setPageState((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPageState((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  // manual merge to show added user
  const handleAddUser = async (newUser) => {
    try {
      setIsAdding(true);
      setActionError(null);
      const createdUser = await addUser(newUser);

      setUsers((current) => [createdUser, ...current]);
      setTotal((prev) => prev + 1);

      return createdUser;
    } catch (err) {
      const errMsg = err?.message;
      setActionError(errMsg);
      throw err;
    } finally {
      setIsAdding(false);
    }
  };

  // manual merge to show deleted user
  const handleDeleteUser = async (id) => {
    try {
      setDeletingId(id);
      setActionError(null);
      await deleteUser(id);

      setUsers((current) => current.filter((user) => user.id !== id));

      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      const errMsg = err?.message ?? "Failed to delete user.";
      setActionError(errMsg);
      throw err;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    users,
    total,
    page,
    limit,
    search,
    sortBy,
    order,
    sortOrder: order,
    totalPages,
    hasPrevPage,
    hasNextPage,
    loading,
    error,
    isAdding,
    deletingId,
    actionError,
    setActionError,
    setPage,
    setLimit,
    setSearch,
    setSort,
    setSortBy,
    setOrder,
    nextPage,
    prevPage,
    handleAddUser,
    handleDeleteUser,
    reload: loadUsers,
  };
}
