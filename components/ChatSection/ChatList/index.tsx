import { CHAT_VARIANT } from "@/utilities/constants";
import { Stack, Center } from "@mantine/core";
import React, { useLayoutEffect, useRef } from "react";
import Chat from "../Chat";
import { useChatStore } from "@/stores/chatStore";
import useUserStore from "@/hooks/useUserStore";

const ChatList = () => {
  const chatRef = useRef<null | HTMLDivElement>(null);
  const { chatList } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
  }));
  const username = useUserStore((state) => state.username);

  // Auto scroll to bottom of the conversation
  useLayoutEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollIntoView({ behavior: "instant" });
  }, [chatList]);

  return (
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
  );
};

export default ChatList;
