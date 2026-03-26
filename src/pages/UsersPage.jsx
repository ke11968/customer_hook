import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import useDebounce from '../hooks/useDebounce';
import UserCard from '../components/UserCard/UserCard';

const UsersPage = () => {
  const { users, loading, error } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    if (!normalizedSearch) {
      return true;
    }

    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(normalizedSearch);
  });

  return (
    <main className="users-page">
      <div className="users-page__container">
        <h1 className="users-page__title">Users List</h1>

        <input
          className="users-page__search"
          type="text"
          placeholder="Search by first or last name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="users-page__state">Loading...</p>}

        {error && !loading && (
          <p className="users-page__state users-page__state--error">Error: {error}</p>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="users-page__state">No users found</p>
        )}

        {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
          <p className="users-page__state">No matching users</p>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <section className="users-page__grid">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default UsersPage;
