import { MenuItem, MenuItems } from "@headlessui/react";
import NotificationsDropdownList from "./DropdownList/NotificationsDropdownList";
import { useEffect } from "react";

const NotificationsDropdown = ({
  notificationsList,
  acceptFriendRequest,
  deleteFriend,
}: {
  acceptFriendRequest: (id: string) => void;
  deleteFriend: () => void;
  notificationsList: {
    id: string;
    username: string;
    from: string;
    message: string;
    date: string;
  }[];
}) => {
  useEffect(() => {}, [notificationsList]);
  return (
    <MenuItems
      transition
      className="msg-box addFriendBtnContainer absolute right-0 z-10 mt-2 h-[417px] w-[575px] origin-top-right scroll-smooth rounded-xl p-2 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="h-auto w-full overflow-y-auto p-2">
        {notificationsList?.length > 0 ? (
          notificationsList?.map((notification) => {
            return (
              <MenuItem key={notification.id}>
                <NotificationsDropdownList
                  acceptFriendRequest={acceptFriendRequest}
                  deleteFriend={deleteFriend}
                  notification={notification}
                />
              </MenuItem>
            );
          })
        ) : (
          <h3 className="text-md text-center font-semibold text-inputBG sm:text-sm">
            No notification found
          </h3>
        )}
      </div>
    </MenuItems>
  );
};

export default NotificationsDropdown;
