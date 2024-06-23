import { ChatStoreContext } from "@/providers/chatStoreProvider";
import { ChatStore } from "@/stores/chatStore";
import { useContext } from "react";
import { useStore } from "zustand";

const useChatStore = <T>(selector: (store: ChatStore) => T): T => {
  const chatStoreContext = useContext(ChatStoreContext);
  if (!chatStoreContext) {
    throw new Error(`useChatStore must be used within ChatrStoreProvider`);
  }
  return useStore(chatStoreContext, selector);
};

export default useChatStore;
