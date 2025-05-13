import userImg from "../../assets/bg-image.jpg";
import { MenuItem } from "@headlessui/react";

interface DropdownListProps {
  Friends: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    is_active: boolean;
    created_at: string;
  };
  onClick: (id: string) => void;
  isLoading : boolean
}

const DropdownList = ({ Friends, onClick,  }: DropdownListProps) => {
  return (
      <MenuItem disabled={true} key={Friends.id}>
      <div className="addFriendBtn flex h-[122px] flex-row items-center justify-between gap-4 rounded-md bg-lightAngularGradient p-2 shadow-lg hover:shadow-xl">
        <div className="flex flex-row items-center gap-4">
          <img
            src={Friends.avatar ?? userImg}
            alt="user"
            className="h-20 w-20 rounded-full"
          />
          <h3 className="text-md font-semibold text-white">
            {Friends.username}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onClick(Friends.id)}
          className="addFriendBtn2 block h-[26px] w-[115px] rounded-full text-xs text-white hover:shadow-lg focus:shadow-xl"
        >
          Add Friend
        </button>
      </div>
    </MenuItem>
  );
};

export default DropdownList;

{
  /* <h3 className="text-gray-700 data-[focus]:text-gray-900 block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
      >
        
      </h3> */
}
