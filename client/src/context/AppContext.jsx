import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data?.success && data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
        if (data?.message) toast.error(data.message);
      }
    } catch (error) {
      console.error("fetchUser error:", error);
      setUser(null);
      const msg = error.response?.data?.message || error.message;
      if (msg) toast.error(msg);
    } finally {
      setLoadingUser(false);
    }
  };

  // Fetch user chats (no recursion, no auto-create for now)
  const fetchUserChats = async () => {
    try {
      const { data } = await axios.get("/api/chat/get");
      if (data?.success && Array.isArray(data.chats)) {
        setChats(data.chats);
        if (data.chats.length > 0) {
          setSelectedChat(data.chats[0]);
        } else {
          setSelectedChat(null);
        }
      } else {
        setChats([]);
        setSelectedChat(null);
        if (data?.message) toast.error(data.message);
      }
    } catch (error) {
      console.error("fetchUserChats error:", error);
      setChats([]);
      setSelectedChat(null);
      const msg = error.response?.data?.message || error.message;
      if (msg) toast.error(msg);
    }
  };

  // Theme effect
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // When token changes: set default header + fetch user
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoadingUser(true);
      fetchUser();
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  // When user changes, load chats
  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    token,
    setToken,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    loadingUser,
    fetchUserChats,
    fetchUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
