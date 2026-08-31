import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import useSort from "../../hooks/useSort";

import type { User } from "../../types/user";

import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Users() {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>("/users");

  const {
    search,
    setSearch,
    filteredItems,
  } = useSearch(
    users ?? [],
    ["firstName", "lastName", "email"]
  );

  const {
    sortedItems,
    sortKey,
    direction,
    sortBy,
  } = useSort(filteredItems, "firstName");

  const {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    previousPage,
    goToPage,
  } = usePagination(sortedItems, 5);

  if (loading) {
    return <Loading message="Loading users..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section>
      <h1>Users</h1>

      <Input
        id="user-search"
        name="search"
        label="Search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search users..."
      />

      <div>
        <Button onClick={() => sortBy("firstName")}>
          First Name
        </Button>

        <Button onClick={() => sortBy("lastName")}>
          Last Name
        </Button>

        <Button onClick={() => sortBy("email")}>
          Email
        </Button>

        <span>
          Sorting: {String(sortKey)} ({direction})
        </span>
      </div>

      <Button onClick={refetch}>
        Refresh
      </Button>

      {paginatedItems.map((user) => (
        <Card
          key={user.id}
          title={`${user.firstName} ${user.lastName}`}
        >
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
        </Card>
      ))}

      {totalPages > 1 && (
        <div>
          <Button
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div>
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <Button
              key={page}
              onClick={() => goToPage(page)}
              disabled={currentPage === page}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
