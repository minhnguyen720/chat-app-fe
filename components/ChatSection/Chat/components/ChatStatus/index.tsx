import { CHAT_STATUS } from "@/utilities/constants";
import { theme } from "@/utilities/theme";
import { Text } from "@mantine/core";
import React from "react";

interface Props {
  status: string;
}

const ChatStatus: React.FC<Props> = ({ status }) => {
  return (
    <Text
      sx={(theme) => ({ fontSize: "1.5vmin", color: theme.colors?.gray[6] })}>
      {status === CHAT_STATUS.RECEIVED ? "Sent" : "Seen"}
    </Text>
  );
};

export default ChatStatus;
