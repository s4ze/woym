"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import axios from "./axios";

const UserContext = createContext(undefined);

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (userContext == undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return userContext;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
