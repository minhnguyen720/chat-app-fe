import { ChatItem, useChatStore } from "@/stores/chatStore";
import { SERVER_URL } from "@/utilities/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const useSocketIo = () => {
  const {
    updateChatList,
    connectedSocket,
    chatList,
    updateContactList,
    contactList,
  } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
    connectedSocket: state.connectedSocket,
    updateContactList: state.updateContactList,
    contactList: state.contactList,
  }));
  const [newChat, setNewChat] = useState<ChatItem | undefined>(undefined);

  // Since Zustand state not able to use in onConnect so we need a state to trigger this useEffect to update global chat list
  useEffect(() => {
    if (newChat) {
      updateChatList(newChat);

      // Push latest contact to the top of contact tree
      const latestContactIndex = contactList.findIndex(
        (obj) => obj.username === newChat.owner
      );
      const tmpArray = [contactList[latestContactIndex]];
      contactList.splice(latestContactIndex, 1);

      updateContactList(tmpArray.concat(contactList));
      setNewChat(undefined);
    }
  }, [newChat]);

  useEffect(() => {
    const onConnect = () => {
      if (connectedSocket && connectedSocket.id) {
        connectedSocket.on("message", (chat: ChatItem) => {
          setNewChat(chat);
        });
      }
    };

    if (connectedSocket && connectedSocket.connected) {
      onConnect();
    }

    connectedSocket && connectedSocket.on("connect", onConnect);

    return () => {
      connectedSocket && connectedSocket.off("connect", onConnect);
      connectedSocket && connectedSocket.off("message", onConnect);
    };
  }, []);
};

export default useSocketIo;
