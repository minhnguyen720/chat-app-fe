import { CHAT_VARIANT } from "@/utilities/constants";
import { Box, Text } from "@mantine/core";
import React from "react";

interface Props {
  variant: string;
  content: string;
}

const ChatContent: React.FC<Props> = ({ variant, content }) => {
  return (
    <Box
      sx={(theme, u) => ({
        padding: "1rem",

        [u.light]: {
          background:
            variant === CHAT_VARIANT.RECEIVER
              ? theme.colors.cyan[2]
              : theme.colors.pink[3],
          borderRadius: "0.5rem",
        },

        [u.dark]: {
          background:
            variant === CHAT_VARIANT.RECEIVER
              ? theme.colors.blue[9]
              : theme.colors.pink[4],
          borderRadius: "0.5rem",
        },
      })}>
      <Text
        sx={{
          fontSize: "1.5vmin",
        }}>
        {content}
      </Text>
    </Box>
  );
};

export default ChatContent;
