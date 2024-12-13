import { useState } from 'react';

const UserModel = () => {
  const [users, setUsers] = useState([]);

  const addUser = (email, password) => {
    const newUser = { id: Date.now(), email, password };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  const updateUserPassword = (email, newPassword) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user
      )
    );
  };

  const deleteUser = (email) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
  };

  return {
    users,
    addUser,
    getUserByEmail,
    updateUserPassword,
    deleteUser,
  };
};

export default UserModel;
