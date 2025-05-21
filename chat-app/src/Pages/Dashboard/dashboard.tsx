/* eslint-disable tailwindcss/no-custom-classname */
// eslint-disable-next-line tailwindcss/classnames-order

import Button from "../../Components/button";
import { Menu, MenuButton } from "@headlessui/react";

import LayoutWrapper from "../../Components/LayoutWrapper";
import notIcon from "../../assets/notification.svg";
import polygon from "../../assets/polygon.svg";

import Dropdown from "../../Components/Dropdown";
import ChatList from "../../Components/ChatList";
import NotificationsDropdown from "../../Components/NotificationsDropdown";
import UserList from "../../Components/List";
import { useDashboard } from "./useDashboard";
import Loader from "../../Components/Loader";

// eslint-disable-next-line react-refresh/only-export-components
export const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "12px",
};

const webSocket = new WebSocket("ws://localhost:3000");

const Dashboard = () => {
  const {
    data,
    newFriends,
    message,
    clearCount,
    connectedUser,
    user,
    sendMessage,
    sendMessageToUser,
    AddFriends,
    setSearchTerm,
    searchTerm,
    notifications_list,
    messageCounter,
    acceptFriendRequest,
    isFriendList,
    isaddFriendLoading,
    heightSet,
    openChat,
    messages,
    chatData,
    logoutUser,
    deleteFriendRequest,
  } = useDashboard(webSocket);

  return (
    <LayoutWrapper>
      <section className="flex min-h-screen w-full">
        <div className="flex max-h-full w-[22%] flex-col border-r-2">
          <div className="flex h-52 w-full items-end justify-end p-2">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // eslint-disable-next-line tailwindcss/classnames-order
              className="text-inputColor h-[50px] w-full rounded-3xl border-indigo-600 bg-inputBG text-lg outline-none"
              placeholder="Search username here"
            />
          </div>
          <div className="list-scroll relative h-[700px] w-full overflow-y-scroll border-t-2 p-2">
            {isFriendList && <Loader xxl={false} style={loadingStyle} />}
            {!isFriendList && !data?.length && (
              <h3 className="text-md text-center text-white">
                No friends found....
              </h3>
            )}
            {!isFriendList && (
              <UserList
                onlineUser={connectedUser}
                clearCount={clearCount}
                count={messageCounter}
                data={data}
                onClick={openChat}
              />
            )}
          </div>
        </div>
        <div
          className={`relative flex w-[78%] flex-col items-center ${chatData.id ? "justify-start" : "justify-between"}`}
        >
          <h2 className="absolute right-20 top-20 text-white">
            {user?.username}
          </h2>
          <button
            onClick={logoutUser}
            // eslint-disable-next-line tailwindcss/classnames-order
            className="text-md text-black absolute right-40 top-[150px] cursor-pointer rounded-md bg-white p-3 font-bold active:bg-lightAngularGradient active:text-white"
          >
            Logout
          </button>
          <div className="p-y-2 flex h-52 w-full items-end justify-between pb-1">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 ">
                  <Button position="left" text="Add Friend" />
                </MenuButton>
              </div>
              <Dropdown
                isLoading={isaddFriendLoading}
                Friends={newFriends ?? []}
                onClick={AddFriends}
              />
            </Menu>
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 ">
                <Button
                  position="right"
                  icon={<img src={`${notIcon}`} />}
                  text="Nottification"
                />
              </MenuButton>
              <NotificationsDropdown
                acceptFriendRequest={acceptFriendRequest}
                deleteFriend={deleteFriendRequest}
                notificationsList={notifications_list}
              />
            </Menu>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-1 p-2">
            <div
              ref={heightSet}
              className={`msg-box mainGradientColor relative w-full overflow-y-auto shadow-lg shadow-gray-400 ${chatData.id ? "h-[618px]" : "h-[686px]"}`}
            >
              <h1 className="text-inputBG pt-3 text-center text-xl font-bold">
                {chatData.username}
              </h1>
              {chatData.id ? (
                <>
                  {messages.map((u, i) => {
                    return <ChatList chatData={chatData} msg={u} key={i} />;
                  })}
                </>
              ) : (
                <h1 className="text-inputBG mt-4 self-center text-center text-xl font-bold">
                  No Chats Founds
                </h1>
              )}
            </div>
            {chatData.id && (
              <div className="relative h-auto w-full">
                <input
                  className="mainGradientColor placeholder:text-inputBG h-16 w-full border-none  p-2 
                text-lg text-white"
                  type="text"
                  onKeyDown={(e) => e.key === "Enter" && sendMessageToUser()}
                  value={message}
                  onChange={(e) => sendMessage(e.target.value)}
                  placeholder="Type your message"
                />
                <img
                  src={`${polygon}`}
                  className="absolute right-1 top-1 cursor-pointer"
                  alt="polygon"
                  onClick={sendMessageToUser}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Dashboard;
