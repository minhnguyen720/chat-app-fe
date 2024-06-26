import { socket } from "@/app/socket";
import { ChatItem, useChatStore } from "@/stores/chatStore";
import { SERVER_URL } from "@/utilities/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const useSocketIo = () => {
  const {
    updateChatList,
    connectedSocket,
    updateContactList,
    contactList,
    updateConnectedSocket,
  } = useChatStore((state) => ({
    updateChatList: state.updateChatList,
    connectedSocket: state.connectedSocket,
    updateContactList: state.updateContactList,
    contactList: state.contactList,
    updateConnectedSocket: state.updateConnectedSocket,
  }));
  const [newChat, setNewChat] = useState<ChatItem | undefined>(undefined);

  // Auto reconnect socket when refresh page
  useEffect(() => {
    if (!connectedSocket) {
      const connectedSocket = socket.connect();
      const username = sessionStorage.getItem("username");
      connectedSocket.on("connect", () => {
        updateConnectedSocket(connectedSocket);
        axios.put(`${SERVER_URL}/auth`, {
          username: username,
          socket: connectedSocket.id,
        });
      });
      connectedSocket.off("connect", () => {
        console.log("Finish assign socket id to user");
      });
    }
  }, [connectedSocket]);

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
