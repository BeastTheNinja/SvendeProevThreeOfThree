import { useState } from "react";

function getNestedValue(item: unknown, path: string): string {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return "";
  }, item) as string;
}

function useSearch<T>(items: T[], searchFields: string[]) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    searchFields.some((field) => {
      const value = getNestedValue(item, field);

      return String(value).toLowerCase().includes(search.toLowerCase());
    })
  );

  return {
    search,
    setSearch,
    filteredItems,
  };
}

export default useSearch;
