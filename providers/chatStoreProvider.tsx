"use client";

import { createChatStore } from "@/stores/chatStore";
import React, { createContext, ReactNode, useRef } from "react";

export type ChatStoreApi = ReturnType<typeof createChatStore>;

export const ChatStoreContext = createContext<ChatStoreApi | undefined>(
  undefined
);

export interface ChatStoreProviderProps {
  children: ReactNode;
}

const ChatStoreProvider: React.FC<ChatStoreProviderProps> = ({ children }) => {
  const chatRef = useRef<ChatStoreApi>();
  if (!chatRef.current) chatRef.current = createChatStore();

  return (
    <ChatStoreContext.Provider value={chatRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export default ChatStoreProvider;
