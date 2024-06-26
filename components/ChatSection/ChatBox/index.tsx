"use client";

import { socket } from "@/app/socket";
import { ActionIcon, Center, Grid, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import React, { useRef } from "react";
import dayjs from "dayjs";
import { CHAT_STATUS } from "@/utilities/constants";
import { v4 as uuidv4 } from "uuid";
import { ChatItem, useChatStore } from "@/stores/chatStore";

const ChatBox = () => {
  const chatboxRef = useRef<HTMLTextAreaElement>(null);
  const { updateChatList, chatList } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
  }));

  const send = () => {
    if (
      chatboxRef.current !== null &&
      chatboxRef.current.value.trim().length > 0
    ) {
      const uniqueId = uuidv4();
      const createdDate = dayjs().toDate();
      const username = sessionStorage.getItem("username");
      const receiver = sessionStorage.getItem("currentContact");

      const chatDto = {
        id: uniqueId,
        content: chatboxRef.current.value,
        createdDate: createdDate,
        status: CHAT_STATUS.SENT,
        owner: username,
        receiver: receiver,
      };

      const newConversationItem = {
        status: CHAT_STATUS.SENT,
        createdDate: createdDate,
        content: chatboxRef.current.value,
      };

      if (chatList) {
        const newChatList = {
          ...chatList,
          conversation: [...chatList.conversation, newConversationItem],
        };
        updateChatList(newChatList);
      } else if (username !== null && receiver !== null) {
        const newChatList: ChatItem = {
          id: uniqueId,
          owner: username,
          receiver: receiver,
          conversation: [newConversationItem],
        };
        updateChatList(newChatList);
      }

      socket.emit("message", chatDto);
      chatboxRef.current.value = "";
    }
  };

  return (
    <>
      <Grid>
        <Grid.Col span={11}>
          <Textarea
            ref={chatboxRef}
            styles={(theme) => ({
              input: {
                border: `1px solid ${theme.colors.gray[6]}`,
                fontSize: "1.75vmin",
              },
            })}
            autosize
            minRows={3}
            maxRows={6}
          />
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Center h={"100%"}>
            <ActionIcon
              onClick={send}
              variant="transparent"
              sx={(theme, u) => ({
                transition: "all 250ms linear",
                "&:hover": {
                  background: theme.colors.blue[2],
                },
              })}>
              <IconSend />
            </ActionIcon>
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ChatBox;
