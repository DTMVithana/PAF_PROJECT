import React, { useState } from 'react';
import { createUser } from '../api/userApi';

const UserForm = ({ refreshUsers }) => {
  const [user, setUser] = useState({
    name: '',
    description: '',
    estimatedtime: 0,
    number_of_steps: 0,
    currentstep: 0,
    status: ''
  });
///ghvfyfg
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(user);
    setUser({
      name: '',
      description: '',
      estimatedtime: 0,
      number_of_steps: 0,
      currentstep: 0,
      status: ''
    });
    refreshUsers();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={user.description} onChange={handleChange} />
      <input name="estimatedtime" type="number" placeholder="Estimated Time" value={user.estimatedtime} onChange={handleChange} />
      <input name="number_of_steps" type="number" placeholder="Number of Steps" value={user.number_of_steps} onChange={handleChange} />
      <input name="currentstep" type="number" placeholder="Current Step" value={user.currentstep} onChange={handleChange} />
      <input name="status" placeholder="Status" value={user.status} onChange={handleChange} />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
