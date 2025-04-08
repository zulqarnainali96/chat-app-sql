import userImg from "../assets/bg-image.jpg";
import { chatDataTypes } from "../Pages/Dashboard/useDashboard";

interface ChatListProps {
  msg: {
    type: string;
    to: string;
    from: string;
    message: string;
  };
  chatData: chatDataTypes;
}

const ChatList = ({ chatData, msg }: ChatListProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div
      className={`flex h-auto w-auto items-center justify-start gap-3 p-2 ${user?.id === msg.to ? "flex-row" : "flex-row-reverse"}`}
    >
      <img
        src={`${userImg}`}
        className="h-14 w-14 rounded-full bg-cover"
        alt="user"
      />
      <div
        className={`gradient2 flex w-[40%] flex-col rounded-lg p-4 shadow-lg ${user?.id === msg.to ? chatData.username : user?.username}`}
      >
        <h3 className="text-lg font-bold text-white">{chatData.username}</h3>
        <h4 className="text-md text-wrap font-medium text-white">
          {msg.message}
        </h4>
      </div>
    </div>
  );
};

export default ChatList;
