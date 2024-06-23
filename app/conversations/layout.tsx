import ApplicationWrapper from "@/components/ApplicationWrapper";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ConversationLayout: React.FC<Props> = ({ children }) => {
  return <ApplicationWrapper>{children}</ApplicationWrapper>;
};

export default ConversationLayout;
