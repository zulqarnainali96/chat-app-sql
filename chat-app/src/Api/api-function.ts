const API_URL = "/api/v1/auth";
const API_URL2 = "/api/v1/notifications";
const API_URL3 = "/api/v1/friends";

interface LoginData {
  email: string;
  password: string;
  username?: string;
}

interface LoginResponse {
  id: string;
  email: string;
  username: string;
  created_at: string;
  avatar: string;
  is_active: boolean;
}

interface RegisterResponse {
  message: string;
  success: string;
}

// Handle User Login
const handleLogin = async (creadentials: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creadentials),
  }).then((res) => res.json());
  return response.data;
};

// Handle User Register

const handleRegister = async (
  creadentials: LoginData,
): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creadentials),
  }).then((res) => res.json());
  return response;
};

const handleUserList = async (id: string) => {
  const response = await fetch(`${API_URL3}/friends-list/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response.data;
};

const getNewFriendList = async (id: string) => {
  const response = await fetch(`${API_URL}/get-new-friends/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response.data;
};

const getNotifcationsList = async (id: string) => {
  const response = await fetch(`${API_URL2}/notifications-list/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response.data;
};

export {
  handleLogin,
  handleRegister,
  handleUserList,
  getNewFriendList,
  getNotifcationsList,
};
