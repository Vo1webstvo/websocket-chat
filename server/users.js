const users = [];

const addUser = (arg) => {
  const nameUser = arg?.user?.trim().toLowerCase();
  const roomUser = arg?.room?.trim().toLowerCase();

  const findUserr = users.find((u) => {
    return u?.user?.trim().toLowerCase() === nameUser && u?.room?.trim().toLowerCase() === roomUser;
  });

  // выбираем пользователя, либо из findUserr если он уже есть, либо из arg (новый)
  const currentUser = findUserr || arg;
  if (!findUserr) {
    users.push(currentUser);
  }
  console.log(users, 'users Posle');

  return {
    findUserr: !!findUserr,
    userInfo: currentUser,
  };
};

const getAllUserRoom = (room) => {
  return users.filter((user) => user?.room === room);
};

const removeUser = (userInRoom) => {
  const updateUsers = users.filter(
    (u) =>
      (u.room === userInRoom?.room && u.name !== userInRoom?.name) || u.room !== userInRoom?.room,
  );
  console.log(updateUsers, 'updateUsers');
  return updateUsers;
};

module.exports = { addUser, getAllUserRoom, removeUser };
