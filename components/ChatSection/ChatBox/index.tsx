"use client";

import { socket } from "@/app/socket";
import { ActionIcon, Center, Grid, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import React, { useRef } from "react";
import dayjs from "dayjs";
import { CHAT_STATUS } from "@/utilities/constants";
import useUserStore from "@/hooks/useUserStore";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "@/stores/chatStore";

const ChatBox = () => {
  const chatboxRef = useRef<HTMLTextAreaElement>(null);
  const username = useUserStore((state) => state.username);
  const receiver = useUserStore((state) => state.receiver);
  const { updateChatList, chatList } = useChatStore((state) => ({
    chatList: state.chatList,
    updateChatList: state.updateChatList,
  }));

  const send = () => {
    if (
      chatboxRef.current !== null &&
      chatboxRef.current.value.trim().length > 0
    ) {
      const newChat = {
        id: uuidv4(),
        content: chatboxRef.current.value,
        createdDate: dayjs().toDate(),
        status: CHAT_STATUS.SENT,
        owner: username,
        receiver: receiver,
      };

      const newChatList = [...chatList, newChat];
      updateChatList(newChatList);

      socket.emit("message", newChat);
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
