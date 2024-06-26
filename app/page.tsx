"use client";

import useUserStore from "@/hooks/useUserStore";
import { Box, Button, px, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { socket } from "./socket";
import { SERVER_URL } from "@/utilities/constants";
import { useChatStore } from "@/stores/chatStore";

const VALID_USERS: string[] = ["willie", "user_1", "user_2"];

const Welcome = () => {
  const router = useRouter();
  const updateConnectedSocket = useChatStore(
    (state) => state.updateConnectedSocket
  );
  const updateAuthorizedUsername = useUserStore(
    (state) => state.updateAuthorizedUsername
  );
  const form = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) =>
        value.trim().length > 0 ? null : "Invalid username",
    },
  });

  const submit = (values: { username: string }) => {
    if (VALID_USERS.includes(values.username)) {
      sessionStorage.setItem("username", values.username);
      updateAuthorizedUsername(values.username);

      const connectedSocket = socket.connect();
      connectedSocket.on("connect", () => {
        updateConnectedSocket(connectedSocket);
        axios
          .put(`${SERVER_URL}/auth`, {
            username: values.username,
            socket: connectedSocket.id,
          })
          .then(() => {
            router.push("/conversations");
          });
      });
      connectedSocket.off("connect", () => {
        console.log("Finish assign socket id to user");
      });
    } else {
      form.setFieldError("username", "Username does not exits");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "70vh",
        }}>
        <form
          onSubmit={form.onSubmit((values) => submit(values))}
          style={{ width: "50%" }}>
          <Title mb={px(10)}>Welcome back!</Title>

          <TextInput
            key={form.key("username")}
            {...form.getInputProps("username")}
            placeholder="username"
          />
          <Box sx={{ marginTop: "1rem" }}>
            <Button type="submit">Go to conversations</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Welcome;
