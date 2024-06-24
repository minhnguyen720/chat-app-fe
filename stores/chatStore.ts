import { Socket } from "socket.io-client";
import { create, createStore } from "zustand";

export type ChatItem = {
  content: string;
  createdDate: Date;
  id: string;
  owner: string;
  receiver: string;
  status: string;
};

export type ChatControlActions = {
  updateCurrentChatName: (chatId: string) => void;
  updateConnectedSocket: (socket: Socket) => void;
  updateChatList: (chatList: ChatItem[]) => void;
};

export type ChatState = {
  currentChatName: string;
  chatList: ChatItem[];
  connectedSocket: Socket<any, any> | undefined;
};

export type ChatStore = ChatState & ChatControlActions;

export const defaultInitState: ChatState = {
  currentChatName: "User 1",
  connectedSocket: undefined,
  chatList: [],
};

export const useChatStore = create<ChatStore>((set) => ({
  currentChatName: "User 1",
  connectedSocket: undefined,
  chatList: [],
  updateCurrentChatName: (chatId) => set(() => ({ currentChatName: chatId })),
  updateConnectedSocket: (socket) => set(() => ({ connectedSocket: socket })),
  updateChatList: (chatList) => set(() => ({ chatList: chatList })),
}));

export const createChatStore = (initState: ChatState = defaultInitState) => {
  return createStore<ChatStore>((set) => ({
    ...initState,
    updateCurrentChatName: (chatId) => set(() => ({ currentChatName: chatId })),
    updateConnectedSocket: (socket) => set(() => ({ connectedSocket: socket })),
    updateChatList: (chatList) => set(() => ({ chatList: chatList })),
  }));
};
