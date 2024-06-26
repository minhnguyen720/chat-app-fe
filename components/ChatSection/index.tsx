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

  // Initialize data
  useEffect(() => {
    const init = async () => {
      const username = sessionStorage.getItem("username");
      const reciever = sessionStorage.getItem("currentContact");
      const res = await axios.get(
        `${SERVER_URL}/chat/by-receiver?username=${username}&receiver=${reciever}`
      );
      console.log("ChatSection", res.data);
      updateChatList(res.data);
    };
    init();
  }, []);

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
