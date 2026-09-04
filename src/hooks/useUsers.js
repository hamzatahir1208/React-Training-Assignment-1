import { useCallback, useEffect, useState } from "react";

export default function useUsers({ initialOptions, fetchUsers, total = 0 }) {
  const [page, setPageState] = useState(initialOptions.page);
  const [limit, setLimitState] = useState(initialOptions.limit);
  const [search, setSearchState] = useState(initialOptions.search);
  const [sortBy, setSortByState] = useState(initialOptions.sortBy);
  const [order, setOrderState] = useState(initialOptions.order);

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const resetToFirstPage = () => {
    setPageState(1);
    setResetPaginationToggle((prev) => !prev);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  useEffect(() => {
    fetchUsers({ page, limit, search, sortBy, order });
  }, [page, limit, search, sortBy, order]);

  const setPage = useCallback((newPage) => {
    setPageState(Math.max(1, newPage));
  }, []);

  const setLimit = useCallback((newLimit) => {
    setLimitState(newLimit);
    resetToFirstPage();
  }, []);

  const setSearch = useCallback((term) => {
    setSearchState(term);
    resetToFirstPage();
  }, []);

  const setSortBy = useCallback((field) => {
    setSortByState(field);
    resetToFirstPage();
  }, []);

  const setOrder = useCallback((newOrder) => {
    setOrderState(newOrder);
    resetToFirstPage();
  }, []);

  const setSort = useCallback((field, direction) => {
    setSortByState(field);
    setOrderState(direction);
    resetToFirstPage();
  }, []);

  return {
    page,
    limit,
    search,
    sortBy,
    order,
    totalPages,
    hasPrevPage,
    hasNextPage,
    resetPaginationToggle,
    setPage,
    setLimit,
    setSearch,
    setSortBy,
    setOrder,
    setSort,
  };
}
