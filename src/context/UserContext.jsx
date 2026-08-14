import { createContext } from 'react';
import { USERS_API_URL } from '../config';
import useFetch from '../hooks/useFetch';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { data, loading, error } = useFetch(USERS_API_URL);

  const users = data?.users || [];

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
