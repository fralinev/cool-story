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

  return (
    <div>
      <Table data={users} />
    </div>
  );
};
export default Users;
