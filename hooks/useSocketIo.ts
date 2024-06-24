import { ChatItem } from "@/stores/chatStore";
import { useEffect } from "react";
import useChatStore from "./useChatStore";
import { SERVER_URL } from "@/utilities/constants";
import axios from "axios";

const useSocketIo = () => {
  const { updateChatList, connectedSocket } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
    connectedSocket: state.connectedSocket,
  }));

  useEffect(() => {
    const onConnect = () => {
      if (connectedSocket && connectedSocket.id) {
        connectedSocket.on("message", (chat: ChatItem) => {
          const username = sessionStorage.getItem("username");
          const receiver = sessionStorage.getItem("currentContact");
          console.log("username", username);
          console.log("reciever", receiver);

          // TODO: will apply lazy fetch later
          axios
            .get(
              `${SERVER_URL}/chat/by-receiver?username=${username}&receiver=${receiver}`
            )
            .then((res) => {
              const newChatList = [...res.data, chat];
              updateChatList(newChatList);
            });
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
