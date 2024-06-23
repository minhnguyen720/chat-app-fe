import { ChatItem } from "@/stores/chatStore";
import { useEffect } from "react";
import useChatStore from "./useChatStore";

const useSocketIo = () => {
  const { chatList, updateChatList, connectedSocket } = useChatStore(
    (state) => ({
      chatList: state.chatList,
      updateChatList: state.updateChatList,
      connectedSocket: state.connectedSocket,
    })
  );

  useEffect(() => {
    const onConnect = () => {
      if (connectedSocket && connectedSocket.id) {
        connectedSocket.on("message", (chat: ChatItem) => {
          updateChatList([...chatList, chat]);
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
