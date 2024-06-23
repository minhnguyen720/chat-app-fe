"use client";

import { CHAT_VARIANT } from "@/utilities/constants";
import { Avatar, Grid, Group, Stack } from "@mantine/core";
import ChatContent from "./components/ChatContent";
import ChatReaction from "./components/ChatReaction";
import ChatStatus from "./components/ChatStatus";

interface Props {
  variant?: string;
  content: string;
  status: string;
}

const Chat: React.FC<Props> = ({
  variant = CHAT_VARIANT.RECEIVER,
  content,
  status,
}) => {
  return (
    <Grid
      align="start"
      justify={variant === CHAT_VARIANT.RECEIVER ? "end" : "start"}>
      <Grid.Col
        span={"content"}
        order={variant === CHAT_VARIANT.RECEIVER ? 2 : 1}>
        <Avatar radius="xl" size="md" variant="transparent" />
      </Grid.Col>
      <Grid.Col span={5} order={variant === CHAT_VARIANT.RECEIVER ? 1 : 2}>
        <Stack gap={"sm"}>
          <ChatContent variant={variant} content={content} />
          <Group justify={variant === CHAT_VARIANT.RECEIVER ? "start" : "end"}>
            {/* <ChatReaction /> */}
            {/* <ChatStatus status={status} /> */}
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Chat;
