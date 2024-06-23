"use client";

import { createUserStore } from "@/stores/userStore";
import React, { createContext, ReactNode, useRef } from "react";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export interface ChatStoreProviderProps {
  children: ReactNode;
}

const UserStoreProvider: React.FC<ChatStoreProviderProps> = ({ children }) => {
  const userRef = useRef<UserStoreApi>();
  if (!userRef.current) userRef.current = createUserStore();

  return (
    <UserStoreContext.Provider value={userRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreProvider;
