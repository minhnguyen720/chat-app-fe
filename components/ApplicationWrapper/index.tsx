"use client";

import { Flex } from "@mantine/core";
import React from "react";
import { DoubleSidebar } from "../DoubleSidebar";
import { useRouter } from "next/navigation";
import useUserStore from "@/hooks/useUserStore";

const ApplicationWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const updateAuthorizedUsername = useUserStore(
    (state) => state.updateAuthorizedUsername
  );
  const currentUsername = sessionStorage.getItem("username");

  if (
    currentUsername !== null &&
    currentUsername !== undefined &&
    currentUsername.trim().length > 0
  ) {
    updateAuthorizedUsername(currentUsername);
  } else {
    router.push("/");
  }

  // useEffect(() => {
  //   const username = sessionStorage.getItem("username");
  //   if (
  //     username === undefined ||
  //     username === null ||
  //     username.trim().length === 0
  //   )
  //     router.push("/");
  // }, []);

  return (
    <Flex>
      <DoubleSidebar />
      <div style={{ flexBasis: "94%", overflow: "hidden", height: "97dvh" }}>
        {children}
      </div>
    </Flex>
  );
};

export default ApplicationWrapper;
