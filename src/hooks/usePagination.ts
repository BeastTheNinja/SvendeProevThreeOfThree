import { useMemo, useState } from "react";

function usePagination<T>(
  items: T[],
  itemsPerPage = 10
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    items.length / itemsPerPage
  );

  const paginatedItems = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    const endIndex =
      startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  function nextPage() {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  }

  function previousPage() {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  }

  function goToPage(page: number) {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages)
    );
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    previousPage,
    goToPage,
  };
}

export default usePagination;
