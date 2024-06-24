"use client";

import { Box } from "@mantine/core";
import React, { useLayoutEffect } from "react";
import ChatBox from "./ChatBox";
import ChatTopbar from "./ChatTopbar";
import useUserStore from "@/hooks/useUserStore";
import { SERVER_URL } from "@/utilities/constants";
import useChatStore from "@/hooks/useChatStore";
import axios from "axios";
import ChatList from "./ChatList";

const ChatSection = () => {
  const { updateChatList } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
  }));
  const { username, receiver } = useUserStore((state) => ({
    username: state.username,
    receiver: state.receiver,
  }));

  // Initialize data
  useLayoutEffect(() => {
    const init = async () => {
      const res = await axios.get(
        `${SERVER_URL}/chat/by-receiver?username=${username}&receiver=${receiver}`
      );
      updateChatList(res.data);
    };
    init();
  }, [username, receiver]);

  return (
    <Box sx={{ padding: "0 1.5rem" }}>
      <ChatTopbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "83vh",
        }}>
        <ChatList />
        <ChatBox />
      </Box>
    </Box>
  );
};

export default ChatSection;
