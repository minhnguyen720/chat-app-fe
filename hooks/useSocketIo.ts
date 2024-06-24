import { ChatItem, useChatStore } from "@/stores/chatStore";
import { useEffect, useState } from "react";

const useSocketIo = () => {
  const { updateChatList, connectedSocket, chatList } = useChatStore(
    (state) => ({
      chatList: state.chatList,
      updateChatList: state.updateChatList,
      connectedSocket: state.connectedSocket,
    })
  );
  const [newChat, setNewChat] = useState<ChatItem | undefined>(undefined);

  useEffect(() => {
    if (newChat) {
      updateChatList([...chatList, newChat]);
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
