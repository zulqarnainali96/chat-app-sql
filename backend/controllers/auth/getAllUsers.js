import { asyncHandler } from "../../utility/asyncHandler.js";
import { APIError } from "../../utility/api-error.js";
import { Connection } from "../../database/db.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const [results] = await Connection.execute("SELECT * FROM Users");
  if (!results.length) {
    throw new APIError("No Users Found", 404);
  }
  res.status(200).send({
    success: true,
    message: "All Users List",
    data: results.map((user) => {
      let obj = {};
      (obj.id = user.id),
        (obj.email = user.email),
        (obj.username = user.username),
        (obj.created_at = user.created_at),
        (obj.avatar = user.avatar);
      obj.is_active = user.is_active === "true" ? true : false;
      return obj;
    }),
  });
});

const getFriendsList = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new APIError("User id is required", 404);
  }
  const [My_Friends] = await Connection.execute(
    "SELECT * FROM My_Friends WHERE user_id = ?",
    [id]
  );
  if (My_Friends.length === 0) {
    throw new APIError("No notifications found", 404);
  }
  let friends_list = My_Friends[0].friends_list;
  if (friends_list === null) {
    return res.status(200).send({
      message: "No Friends Found",
      success : false,
      data: [],
    });
    
  } else if (typeof friends_list === "string") {
    friends_list = JSON.parse(friends_list);
    const [Users] = await Connection.execute("SELECT * FROM Users");
    if (!Users.length) {
      throw new APIError("Users List is empty", 404);
    }
    const userfriend_list = Users.filter( u => friends_list?.includes(u.id))
    // console.log(Users)
    // console.log(friends_list)
    // console.log('friend list=> ',userfriend_list)
    if(userfriend_list.length > 0){
      return res.status(200).send({
        message : "Friend list found",
        data : userfriend_list
      })
    }
  }
});

// Sending all Users except the logged in user

const getNewFriendsList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new APIError("User id is required", 400);
  }
  const [results] = await Connection.execute(
    "SELECT * FROM Users WHERE id != ?",
    [id]
  );

  const [results2] = await Connection.execute(
    "SELECT * FROM My_Friends WHERE user_id = ?",
    [id]
  );
  if (!results.length || !results2.length) {
    throw new APIError("User not found", 404);
  }
  let friendList = results2[0].friends_list;
  if (friendList === null) {
    return res.status(200).send({
      success: true,
      message: "New Friends List",
      data: results.map((user) => {
        let obj = {};
        (obj.id = user.id),
          (obj.email = user.email),
          (obj.username = user.username),
          (obj.created_at = user.created_at),
          (obj.avatar = user.avatar);
        obj.is_active = user.is_active === "true" ? true : false;
        return obj;
      }),
    });
  } else if (typeof friendList === "string") {
    friendList = JSON.parse(friendList);
    const newFriendList = results.filter((user) => {
      return !friendList.some((friend) => friend === user.id);
    });
    if (newFriendList.length > 0) {
      return res.status(200).send({
        success: true,
        message: "New Friends List",
        data: newFriendList.map((user) => {
          let obj = {};
          (obj.id = user.id),
            (obj.email = user.email),
            (obj.username = user.username),
            (obj.created_at = user.created_at),
            (obj.avatar = user.avatar);
          obj.is_active = user.is_active === "true" ? true : false;
          return obj;
        }),
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "No New Friends",
        data: [],
      });
    }
  }
});

export { getAllUsers, getNewFriendsList, getFriendsList };
