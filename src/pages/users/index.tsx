import { useEffect, useState } from "react";
import Table from "../Table";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    };
    getUsers();
  }, []);

  const formattedUsers = (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>password</th>
          <th>roles</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => {
          return (
            <tr>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{JSON.stringify(user.roles)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div>
      <Table data={users} />
    </div>
  );
};
export default Users;
