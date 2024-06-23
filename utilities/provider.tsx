"use client";

import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { emotionTransform } from "@mantine/emotion";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MantineProvider
      defaultColorScheme="light"
      stylesTransform={emotionTransform}
      theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default Provider;
