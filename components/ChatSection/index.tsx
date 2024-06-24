"use client";

import { Box } from "@mantine/core";
import React, { useEffect } from "react";
import ChatBox from "./ChatBox";
import ChatTopbar from "./ChatTopbar";
import { SERVER_URL } from "@/utilities/constants";
import { useChatStore } from "@/stores/chatStore";
import axios from "axios";
import ChatList from "./ChatList";

const ChatSection = () => {
  const { updateChatList } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
  }));

  const username = sessionStorage.getItem("username");
  const reciever = sessionStorage.getItem("currentContact");
  // Initialize data
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(
        `${SERVER_URL}/chat/by-receiver?username=${username}&receiver=${reciever}`
      );
      updateChatList(res.data);
    };
    init();
  }, [username, reciever]);

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
