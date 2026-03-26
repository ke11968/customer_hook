import { createContext } from 'react';
import useFetch from '../hooks/useFetch';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { data, loading, error } = useFetch('https://dummyjson.com/users');

  const users = data?.users || [];

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
