import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Navbar = ({ user }: any) => {
  const { setUser } = useContext(UserContext);
  const handleClick = () => {
    console.log(user);
    setUser(null);
  };
  return (
    <div className="navbar-outer-container">
      <div className="navbar-inner-container">
        <h2>Cool story, {user ? `${user.username}...` : "bruh..."}</h2>
        <div className="navbar-menu-items">
          {user ? (
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              logout
            </div>
          ) : (
            <Link href="/login">login</Link>
          )}
          {user ? null : <Link href="/signup">signup</Link>}
          <h4>post</h4>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
