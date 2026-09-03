import { useCallback, useEffect, useState } from "react";

export default function useUsers({initialOptions, fetchUsers}) {
  const [page, setPageState] = useState(initialOptions.page);
  const [limit, setLimitState] = useState(initialOptions.limit);
  const [search, setSearchState] = useState(initialOptions.search);
  const [sortBy, setSortByState] = useState(initialOptions.sortBy);
  const [order, setOrderState] = useState(initialOptions.order);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  useEffect(() => {
    fetchUsers({ page, limit, search, sortBy, order });
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
    setPage,
    setLimit,
    setSearch,
    setSort,
    setSortBy,
    setOrder,
    nextPage,
    prevPage,
    reload: loadUsers,
  };
}
