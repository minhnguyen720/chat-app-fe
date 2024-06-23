"use client";

import { SERVER_URL } from "@/utilities/constants";
import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : SERVER_URL;

export const socket = io(URL ? URL : SERVER_URL, {
  autoConnect: false,
});
