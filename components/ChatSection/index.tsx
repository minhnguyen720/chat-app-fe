"use client";

import { Box, Center, Stack } from "@mantine/core";
import React, { useLayoutEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import ChatTopbar from "./ChatTopbar";
import useUserStore from "@/hooks/useUserStore";
import { CHAT_VARIANT, SERVER_URL } from "@/utilities/constants";
import Chat from "./Chat";
import useSocketIo from "@/hooks/useSocketIo";
import useChatStore from "@/hooks/useChatStore";
import axios from "axios";

const ChatSection = () => {
  const chatRef = useRef<null | HTMLDivElement>(null);
  const { chatList, updateChatList } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
  }));
  const { username, receiver } = useUserStore((state) => ({
    username: state.username,
    receiver: state.receiver,
  }));
  useSocketIo();

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

  // Auto scroll to bottom of the conversation
  useLayoutEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollIntoView({ behavior: "instant" });
  }, [chatList]);

  const updateChatMockData = (newChat: any) => {
    updateChatList([...chatList, newChat]);
  };

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
        <Stack
          gap={"md"}
          sx={{
            height: "85%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "0.5rem",
          }}>
          {chatList.length > 0 ? (
            chatList.map((item) => {
              return (
                <div key={item.id}>
                  <Chat
                    content={item.content}
                    status={item.status}
                    variant={
                      username === item.owner
                        ? CHAT_VARIANT.RECEIVER
                        : CHAT_VARIANT.DELIEVER
                    }
                  />
                </div>
              );
            })
          ) : (
            <Center
              sx={(theme) => ({
                height: "100%",
                fontSize: "1.5rem",
                color: theme.colors.gray[6],
              })}>
              This conversation has no chat yet
            </Center>
          )}
          <div ref={chatRef} />
        </Stack>
        <ChatBox updateChatMockData={updateChatMockData} />
      </Box>
    </Box>
  );
};

export default ChatSection;
