// import { people } from "./DropdownList/data";
import { ReactNode } from "@tanstack/react-router";
import userImg from "../assets/bg-image.jpg";
import { chatDataTypes } from "../Pages/Dashboard/useDashboard";
import { UnreadMsg } from "./unread-box";

interface ListProps {
  onClick: (obj: chatDataTypes) => void;
  clearCount: (id: string) => void;
  count: { id: string; count: number }[];
  onlineUser: string[];
  data: chatDataTypes[];
}
const UserList = ({
  data,
  onClick,
  count,
  clearCount,
  onlineUser,
}: ListProps) => {
  function checkOnline(id: string, online: string): ReactNode {
    if (id === online) return <p className="text-sm/5 font-semibold  text-green">Online</p>;
    else {
      <p className="text-gray-200 text-xs/5 font-semibold">offline</p>;
    }
  }
  return (
    <ul role="list" className="h-auto py-1">
      {data?.map((data) => (
        <li
          key={data.id}
          onClick={() => {
            onClick(data);
            clearCount(data.id);
          }}
          // gradient2
          className="relative mb-3 flex cursor-pointer flex-row items-center justify-between gap-4 rounded-lg bg-lightAngularGradient px-2 py-5 shadow-xl active:bg-gray-400"
        >
          {count?.map((c) => {
            if (data.id === c.id) return <UnreadMsg count={c.count} />;
          })}
          <div className=" flex min-w-0 items-center justify-center gap-x-4 ">
            <img
              alt=""
              src={data.avatar ?? userImg}
              className="size-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-inputBG">
                {data.username}
              </p>
              <p className="text-gray-500 mt-1 truncate text-xs/9 text-inputBG">
                Last message..........
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="bg-emerald-500/20 flex-none rounded-full p-1">
                <div className="bg-emerald-500 size-1.5 rounded-full" />
              </div>
              {onlineUser?.map((online) => {
                return checkOnline(data.id, online);
              })}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
