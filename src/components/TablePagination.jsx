import { Pagination } from "react-bootstrap";

export default function TablePagination({
  currentPage = 1,
  totalPages = 1,
  hasPrevPage = false,
  hasNextPage = false,
  onPageChange,
  disabled = false,
}) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const handleClick = (page) => {
    if (disabled || page < 1 || page > totalPages || page === safePage) return;
    onPageChange?.(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (safePage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (safePage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        disabled={!hasPrevPage || disabled}
        onClick={() => handleClick(safePage - 1)}
      />

      {getPageNumbers().map((pageItem, index) =>
        pageItem === "..." ? (
          <Pagination.Ellipsis key={`ellipsis-${index}`} disabled />
        ) : (
          <Pagination.Item
            key={pageItem}
            active={safePage === pageItem}
            disabled={disabled}
            onClick={() => handleClick(pageItem)}
          >
            {pageItem}
          </Pagination.Item>
        )
      )}

      <Pagination.Next
        disabled={!hasNextPage || disabled}
        onClick={() => handleClick(safePage + 1)}
      />
    </Pagination>
  );
}
