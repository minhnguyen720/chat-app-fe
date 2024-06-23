import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import {
  Box,
  Divider,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const ChatTopbar = () => {
  const currentChatName = useChatStore((state) => state.currentChatName);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={{
        padding: "1rem 0",
      }}>
      <Text fz="h4">{currentChatName}</Text>
      <Divider
        my={10}
        size={"sm"}
        color={
          colorScheme === "light" ? theme.colors.gray[9] : theme.colors.gray[7]
        }
      />
    </Box>
  );
};

export default ChatTopbar;
