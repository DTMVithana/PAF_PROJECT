import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
