import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = ({ currentUser }: any) => {
  const { setCurrentUser } = useContext(UserContext);
  const handleClick = () => {
    setCurrentUser(null);
  };
  return (
    <div className="navbar-outer-container">
      <div className="navbar-inner-container">
        <h2>
          Cool story, {currentUser ? `${currentUser.username}...` : "bruh..."}
        </h2>
        <div className="navbar-menu-items">
          {currentUser ? (
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              logout
            </div>
          ) : (
            <Link href="/login">login</Link>
          )}
          {currentUser ? null : <Link href="/signup">signup</Link>}
          <h4>post</h4>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
