import { createStore } from "zustand";

export type User = {
  username: string;
  receiver: string;
};

export type UserControlActions = {
  updateAuthorizedUsername: (username: string) => void;
  updateReceiverUsername: (username: string) => void;
};

export type UserStore = User & UserControlActions;

export const createUserStore = () => {
  return createStore<UserStore>((set) => ({
    username: "",
    receiver: "",
    updateAuthorizedUsername: (username) => set(() => ({ username: username })),
    updateReceiverUsername: (username) => set(() => ({ receiver: username })),
  }));
};
