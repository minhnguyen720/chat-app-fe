import { CHAT_VARIANT } from "@/utilities/constants";
import { Stack, Center } from "@mantine/core";
import React, { useLayoutEffect, useRef } from "react";
import Chat from "../Chat";
import { useChatStore } from "@/stores/chatStore";
import useUserStore from "@/hooks/useUserStore";

const NoChatContainer = () => {
  return (
    <Center
      sx={(theme) => ({
        height: "100%",
        fontSize: "1.5rem",
        color: theme.colors.gray[6],
      })}>
      This conversation has no chat yet
    </Center>
  );
};

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
      {chatList && chatList.conversation.length > 0 ? (
        chatList.conversation.map((item, index) => {
          return (
            <div key={`${chatList.id}-item-${index}`}>
              <Chat
                content={item.content}
                status={item.status}
                variant={
                  username === chatList.owner
                    ? CHAT_VARIANT.RECEIVER
                    : CHAT_VARIANT.DELIEVER
                }
              />
            </div>
          );
        })
      ) : (
        <NoChatContainer />
      )}
      <div ref={chatRef} />
    </Stack>
  );
};

export default ChatList;
