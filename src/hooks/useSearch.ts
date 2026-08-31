import { useMemo, useState } from "react";

function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[]
) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search.trim()) {
      return items;
    }

    const searchTerm = search.toLowerCase();

    return items.filter((item) =>
      searchFields.some((field) =>
        String(item[field])
          .toLowerCase()
          .includes(searchTerm)
      )
    );
  }, [items, search, searchFields]);

  return {
    search,
    setSearch,
    filteredItems,
  };
}

export default useSearch;
