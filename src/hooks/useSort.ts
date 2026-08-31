import { useMemo, useState } from "react";

type SortDirection = "asc" | "desc";

function useSort<T>(
  items: T[],
  defaultKey: keyof T
) {
  const [sortKey, setSortKey] =
    useState<keyof T>(defaultKey);

  const [direction, setDirection] =
    useState<SortDirection>("asc");

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const valueA = String(a[sortKey]).toLowerCase();
      const valueB = String(b[sortKey]).toLowerCase();

      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [items, sortKey, direction]);

  function sortBy(key: keyof T) {
    if (sortKey === key) {
      setDirection((currentDirection) =>
        currentDirection === "asc"
          ? "desc"
          : "asc"
      );

      return;
    }

    setSortKey(key);
    setDirection("asc");
  }

  return {
    sortedItems,
    sortKey,
    direction,
    sortBy,
  };
}

export default useSort;
