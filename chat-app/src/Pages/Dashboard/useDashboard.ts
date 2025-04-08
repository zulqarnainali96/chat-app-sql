import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getNewFriendList,
  getNotifcationsList,
  handleUserList,
} from "../../Api/api-function";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { initialState, reducer } from "../../store/store";
import { useToaster } from "../../Context/ToasterContext";
import { useNavigate } from "@tanstack/react-router";

export type chatDataTypes = {
  id: string;
  username: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  password: string;
  email: string;
  is_active: boolean;
};
const useTypes = {
  id: "",
  username: "",
  avatar: null,
  created_at: "",
  updated_at: "",
  password: "",
  email: "",
  is_active: false,
};
export const useDashboard = (webSocket: WebSocket) => {
  const [_, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [chatData, setChatData] = useState<chatDataTypes>(useTypes);
  const [message, sendMessage] = useState<string | "">("");
  const [search, setSearch] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [connectedUser, setConnectedUsers] = useState<string[]>([]);

  const [messageCounter, setMessageCounter] = useState<
    { count: number; id: string }[]
  >([]);
  const heightSet = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<
    { type: string; to: string; from: string; message: string }[]
  >([]);
  const queryClient = useQueryClient();
  const { showToaster } = useToaster();

  const { data, isError, isPending, isLoading, isFetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => handleUserList(user.id),
    refetchInterval: 10000,
  });
  const AddFriends = (id: string) => {
    const userData = JSON.stringify({
      type: "add_friend",
      messageData: {
        user_id: user.id,
        from: id,
      },
    });
    webSocket.send(userData);
  };

  const { data: newFriends, isLoading: isaddFriendLoading } = useQuery({
    queryKey: ["new_friends"],
    queryFn: () => getNewFriendList(user.id),
    refetchInterval: 10000,
  });

  const { data: notifications_list } = useQuery({
    queryKey: ["notifications-list"],
    queryFn: () => getNotifcationsList(user.id),
    refetchInterval: 10000,
  });

  const acceptFriendRequest = (id: string) => {
    const data = {
      type: "accept-request",
      messageData: {
        user_id: user.id,
        from: id,
      },
    };
    if (webSocket.readyState === webSocket.OPEN) {
      webSocket.send(JSON.stringify(data));
    } else {
      showToaster("Failed to Proceed! Check your internet connection", "error");
    }
  };
  const deleteFriendRequest = () => {};

  const openChat = (obj: chatDataTypes) => {
    setChatData({
      ...obj,
    });
  };
  const filteredUsers = useMemo(() => {
    if (!debouncedSearchTerm) return data || [];
    const term = debouncedSearchTerm.toLowerCase();
    return (data || []).filter((u: chatDataTypes) => {
      if (searchTerm) {
        return (
          u.username.toLowerCase().startsWith(term) ||
          u.username.toLowerCase().includes(term)
        );
      }
      // Search all fields
      return u.username.toLowerCase().startsWith(term);
    });
  }, [data, debouncedSearchTerm]);

  const logoutUser = () => {
    localStorage.removeItem("user");
    showToaster("Logut Successfully", "success");
    navigate({ to: "/login", from: "/dashboard" });
    webSocket.close()
  };

  const sendMessageToUser = () => {
    if (!message) return;
    setMessages([
      ...messages,
      {
        type: "private-message",
        to: chatData.id,
        from: user.id,
        message,
      },
    ]);
    if (webSocket.readyState === webSocket.OPEN) {
      webSocket.send(
        JSON.stringify({
          type: "private-message",
          to: chatData.id,
          from: user.id,
          message,
        }),
      );
      sendMessage("");
    }
  };

  const handleMessageCount = (data: {
    from: string;
    type: string;
    to: string;
    message: string;
  }) => {
    if (chatData) {
      if (data?.from !== chatData.id) {
        setMessageCounter((prev) => {
          let result = null;
          let finalres: { id: string; count: number }[] = [];
          if (prev.length > 0) {
            result = prev.find((item) => {
              return item.id === data.from;
            });
            let res = prev.filter((item) => item.id !== data.from);
            if (result) {
              finalres = [...res, { ...result, count: (result.count += 1) }];
            } else {
              finalres = [...prev, { id: data.from, count: 1 }];
            }
          } else {
            finalres = [{ id: data.from, count: 1 }];
          }
          return finalres;
        });
      }
    }
  };

  const clearCount = (id: string) => {
    setMessageCounter((prev) => {
      return prev.filter((i) => i.id !== id);
    });
  };

  useEffect(() => {
    if (webSocket.readyState === webSocket.OPEN) {
      console.log('data send:')
      dispatch({ type: "socket", payload: webSocket });
      webSocket.send(JSON.stringify({ type: "user_online", id: user.id }));
    }
    return () => {
      webSocket.onclose = () => {
        console.log('Connection is closed')
      }
    }
  }, [webSocket]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { type } = data;
      if (type === "error-msg") {
        showToaster(data.message, "error");
      }
      if (type === "notifications-msg") {
        queryClient.invalidateQueries({ queryKey: ["notifications-list"] });
        showToaster(data.message, "success");
      }
      if (type === "private-message") {
        setMessages((prev) => [...prev, data]);
        heightSet.current?.scrollIntoView({ behavior: "smooth" });
        handleMessageCount(data);
      }
      if (type === "error-msg") {
        showToaster(data.message, "error");
      }
      if (type === "connected-user") {
        setConnectedUsers(data?.onlineUsersList);
        console.log("connected user:", data?.onlineUsersList);
      }
    };
    
  }, [webSocket]);


  return {
    data: filteredUsers,
    message,
    messageCounter,
    connectedUser,
    user,
    search,
    searchTerm,
    setSearchTerm,
    setSearch,
    heightSet,
    clearCount,
    logoutUser,
    messages,
    sendMessage,
    sendMessageToUser,
    isFriendList: isLoading,
    isaddFriendLoading,
    openChat,
    isFetching,
    newFriends,
    chatData,
    isError,
    isPending,
    AddFriends,
    notifications_list,
    acceptFriendRequest,
    deleteFriendRequest,
  };
};
