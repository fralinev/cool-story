import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

const Users = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  if (!currentUser || !currentUser.isAdmin) {
  }
  return <div>Users</div>;
};
export default Users;
