import { UserStoreContext } from "@/providers/userStoreProvider";
import { UserStore } from "@/stores/userStore";
import { useContext } from "react";
import { useStore } from "zustand";

const useUserStore = <T>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);
  if (!userStoreContext) {
    throw new Error(`useChatStore must be used within ChatrStoreProvider`);
  }
  return useStore(userStoreContext, selector);
};

export default useUserStore;
