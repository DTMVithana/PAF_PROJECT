import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/userApi';
import UserForm from '../Tharindi_components/UserForm';
import UserList from '../Tharindi_components/UserList';

const Home = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>Cooking App - Home</h1>
      <UserForm refreshUsers={loadUsers} />
      <UserList users={users} />
    </div>
  );
};

export default Home;
