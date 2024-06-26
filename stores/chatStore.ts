import { Socket } from "socket.io-client";
import { create } from "zustand";

export type ChatItem = {
  conversation: {
    status: string;
    content: string;
    createdDate: Date;
  }[];
  id: string;
  owner: string;
  receiver: string;
};

export type Contact = {
  id: number;
  username: string;
  online: boolean;
  name: string;
};

export type ChatControlActions = {
  updateCurrentChatName: (chatId: string) => void;
  updateConnectedSocket: (socket: Socket) => void;
  updateChatList: (chatList: ChatItem) => void;
  updateContactList: (contactList: Contact[]) => void;
  updateLatestFlag: (value: boolean) => void;
};

export type ChatState = {
  currentChatName: string;
  contactList: Contact[];
  chatList: ChatItem | undefined;
  connectedSocket: Socket<any, any> | undefined;
  latestFlag: boolean;
};

export type ChatStore = ChatState & ChatControlActions;

export const useChatStore = create<ChatStore>((set) => ({
  currentChatName: "User 1",
  connectedSocket: undefined,
  chatList: undefined,
  contactList: [],
  updateCurrentChatName: (chatId) => set(() => ({ currentChatName: chatId })),
  updateConnectedSocket: (socket) => set(() => ({ connectedSocket: socket })),
  updateChatList: (chatList) => set(() => ({ chatList: chatList })),
  updateContactList: (contactList) =>
    set(() => ({
      contactList: contactList,
    })),
  latestFlag: false,
  updateLatestFlag: (value) => set(() => ({ latestFlag: value })),
}));
