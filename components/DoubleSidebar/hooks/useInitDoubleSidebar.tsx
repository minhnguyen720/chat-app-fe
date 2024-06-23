import { Tooltip, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBubble } from "@tabler/icons-react";
import { useState, useMemo, useEffect } from "react";
import classes from "../DoubleSidebar.module.css";
import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import axios from "axios";
import { SERVER_URL } from "@/utilities/constants";

const defaultUsers = [
  { username: "user_1", name: "User 1" },
  { username: "user_2", name: "User 2" },
  { username: "willie", name: "Willie" },
];

const contactsMockdata = defaultUsers.filter((item) => {
  return item.username !== sessionStorage.getItem("username");
});

const menuItemsMockdata = [{ icon: IconBubble, label: "Coversations" }];

const useInitDoubleSidebar = () => {
  const [active, setActive] = useState("Conversations");
  const [activeLink, setActiveLink] = useState("");
  const [opened, { open, toggle }] = useDisclosure(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { updateCurrentChat, updateChatList } = useChatStore((state) => ({
    updateCurrentChat: state.updateCurrentChatName,
    updateChatList: state.updateChatList,
  }));
  const updateReceiverUsername = useUserStore(
    (state) => state.updateReceiverUsername
  );

  // Initialize phase
  useEffect(() => {
    const currentContact = sessionStorage.getItem("currentContact");
    const currentContactName = sessionStorage.getItem("currentContactName");

    if (currentContactName) {
      updateCurrentChat(currentContactName);
    } else {
      updateCurrentChat(contactsMockdata[0].name);
    }

    if (currentContact) {
      setActiveLink(currentContact);
      updateReceiverUsername(currentContact);
    } else {
      setActiveLink(contactsMockdata[0].username);
      updateReceiverUsername(contactsMockdata[0].username);
    }
  }, []);

  const updateConversationByReceiverUsername = async (
    receiverUsername: string
  ) => {
    const username = sessionStorage.getItem("username");
    const res = await axios.get(
      `${SERVER_URL}/chat/by-receiver?username=${username}&receiver=${receiverUsername}`
    );
    updateChatList(res.data);
  };

  const menuItems = useMemo(() => {
    return menuItemsMockdata.map((link) => (
      <Tooltip
        label={link.label}
        position="right"
        withArrow
        transitionProps={{ duration: 0 }}
        key={link.label}>
        <UnstyledButton
          onClick={() => {
            setActive(link.label);
            open();
          }}
          className={classes.mainLink}
          data-active={link.label === active || undefined}>
          <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    ));
  }, [menuItemsMockdata, active]);

  const contacts = useMemo(() => {
    return contactsMockdata.map((contacts) => (
      <a
        className={classes.link}
        data-active={activeLink === contacts.username || undefined}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          setActiveLink(contacts.username);
          updateReceiverUsername(contacts.username);
          updateCurrentChat(contacts.name);
          sessionStorage.setItem("currentContact", contacts.username);
          sessionStorage.setItem("currentContactName", contacts.name);
          updateConversationByReceiverUsername(contacts.username);
        }}
        key={contacts.username}>
        {contacts.name}
      </a>
    ));
  }, [contactsMockdata, activeLink]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return {
    loaded,
    opened,
    menuItems,
    toggle,
    active,
    contacts,
  };
};

export default useInitDoubleSidebar;
