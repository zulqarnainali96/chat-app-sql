export type State = {
  user: {
    id?: string;
    email?: string;
    username?: string;
    created_at?: string;
    avatar?: string;
    is_active?: boolean;
  } | null;
  socket: {} | null;

  chatData: {
    id: string;
    username: string;
    email: string;
    avatar: string | null;
  };
  messages: { to: string; from: string; message: string, type : string, }[];
};

export type Action =
  | { type: "Login"; payload: {} }
  | { type: "Logout"; payload: null }
  | { type: "socket"; payload: {} }
  | {
      type: "chat-data";
      payload: {
        id: string;
        username: string;
        email: string;
        avatar: string | null;
      };
    }
  | {
      type: "chat-messages";
      payload: { to: string; from: string; message: string, type : string, }[];
    };

export const initialState: State = {
  user: null,
  socket: null,
  chatData: {
    id: "",
    username: "",
    avatar: "",
    email: "",
  },
  messages: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        user: action.payload,
      };
    case "Logout":
      return {
        ...state,
        user: action.payload,
      };
    case "socket":
      return {
        ...state,
        socket: action.payload,
      };

    case "chat-data":
      return {
        ...state,
        chatData: action.payload,
      };
    case "chat-messages":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
