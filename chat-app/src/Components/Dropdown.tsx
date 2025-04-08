import { MenuItems } from "@headlessui/react";
import DropdownList from "./DropdownList/DropdownList";
import Loader from "./Loader";
import { loadingStyle } from "../Pages/Dashboard/dashboard";

interface DropdownProps {
  Friends: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    is_active: boolean;
    created_at: string;
  }[];
  onClick: (id: string) => void;
  isLoading: boolean;
}
const Dropdown = ({ Friends, onClick, isLoading }: DropdownProps) => {
  return (
    <>
      <MenuItems
        transition
        className="addFriendBtnContainer absolute z-10 mt-2 h-[417px] w-[575px] origin-top-right rounded-md shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="h-auto w-full overflow-y-auto p-2">
          {isLoading && <Loader style={loadingStyle} xxl={false} />}
          {Friends?.map((f) => {
            return (
              <DropdownList
                isLoading={isLoading}
                key={f.id}
                Friends={f}
                onClick={onClick}
              />
            );
          })}
        </div>
      </MenuItems>
    </>
  );
};

export default Dropdown;
