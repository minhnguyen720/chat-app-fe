"use client";

import {
  UnstyledButton,
  Tooltip,
  Title,
  Flex,
  Box,
  useMantineColorScheme,
  Stack,
  Loader,
  Center,
} from "@mantine/core";
import { IconArrowBarLeft, IconSun, IconMoon } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./DoubleSidebar.module.css";
import useInitDoubleSidebar from "./hooks/useInitDoubleSidebar";

export function DoubleSidebar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { loaded, opened, menuItems, toggle, active, contacts } =
    useInitDoubleSidebar();

  return (
    <>
      {loaded ? (
        <div
          className={classes.navbar}
          style={{
            height: "100dvh",
            borderRight: opened
              ? colorScheme === "light"
                ? "1.25px solid #dee2e6"
                : "1.25px solid #2E2E2E"
              : "none",
          }}>
          <div className={classes.wrapper}>
            <div className={classes.aside}>
              <div className={classes.logo}>
                <MantineLogo type="mark" size={30} />
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                }}>
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  {menuItems}
                </Flex>
                <Box
                  sx={{
                    paddingBottom: "2.5rem",
                  }}>
                  <Stack>
                    <Tooltip label="Toggle dark mode">
                      <UnstyledButton
                        className={classes.mainLink}
                        onClick={toggleColorScheme}>
                        {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
                      </UnstyledButton>
                    </Tooltip>
                    <Tooltip label={"Toggle contact list"}>
                      <UnstyledButton
                        className={classes.mainLink}
                        onClick={toggle}>
                        <IconArrowBarLeft />
                      </UnstyledButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Box>
            </div>
            <div
              className={classes.main}
              style={{
                width: opened ? "20rem" : 0,
                opacity: opened ? 1 : 0,
              }}>
              <Title order={4} className={classes.title}>
                {active}
              </Title>
              {contacts}
            </div>
          </div>
        </div>
      ) : (
        <Center
          style={{
            padding: "0 3rem",
          }}>
          <Loader size={"xs"} />
        </Center>
      )}
    </>
  );
}
