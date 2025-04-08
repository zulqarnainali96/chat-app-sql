const NotificationsDropdownList = ({
  notification,
  acceptFriendRequest,
  deleteFriend
}: {
  acceptFriendRequest : (id : string) => void;
  deleteFriend : () => void;
  notification: {
    id: string;
    username: string;
    from: string;
    message: string;
    date: string;
  };
}) => {
  const { date, message, from } = notification;
  const d = [new Date(date).toLocaleDateString()].join('-');
  const time = new Date(date).toLocaleTimeString();
  return (
    <div className="addFriendBtn mb-2 flex h-[122px] flex-row items-center justify-between gap-4 rounded-lg bg-lightAngularGradient p-2 shadow-lg hover:shadow-xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-md font-semibold text-white">you have recieved { "a " + message}</h3>
        <span className="text-sm font-light italic text-inputBG">
          {d + " " + time}
        </span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <button onClick={() => acceptFriendRequest(from)} className="addFriendBtn2 block h-[22px] w-[110px] rounded-full text-xs text-white hover:shadow-lg focus:shadow-xl">
          Add Friend
        </button>
        <button onClick={deleteFriend} className="addFriendBtn2 block h-[22px] w-[110px] rounded-full text-xs text-white hover:shadow-lg focus:shadow-xl">
          Delete Friend
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdownList;

{
  /* <h3 className="text-gray-700 data-[focus]:text-gray-900 block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
      >
        
      </h3> */
}
