"use client";

import ApplicationWrapper from "@/components/ApplicationWrapper";
import useSocketIo from "@/hooks/useSocketIo";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ConversationLayout: React.FC<Props> = ({ children }) => {
  useSocketIo();
  return <ApplicationWrapper>{children}</ApplicationWrapper>;
};

export default ConversationLayout;
