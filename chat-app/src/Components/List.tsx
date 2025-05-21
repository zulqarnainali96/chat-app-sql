/* eslint-disable tailwindcss/no-custom-classname */
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
  function checkOnline(id: string, online: string, index : number): ReactNode {
    if (id === online) return <p key={index} className="text-green text-sm/5  font-semibold">Online</p>;
    else {
      <p key={index} className="text-xs/5 font-semibold text-gray-200">offline</p>;
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
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="bg-lightAngularGradient relative mb-3 flex cursor-pointer flex-row items-center justify-between gap-4 rounded-lg px-2 py-5 shadow-xl active:bg-gray-400"
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
              <p className="text-inputBG text-sm/6 font-semibold">
                {data.username}
              </p>
              {/* // eslint-disable-next-line tailwindcss/no-custom-classname */}
              <p className="text-inputBG mt-1 truncate text-xs/9 text-gray-500">
                Last message..........
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              {onlineUser?.map((online,index) => {
                return checkOnline(data.id, online,index);
              })}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
