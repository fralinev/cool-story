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
            <div>
              <div onClick={handleClick} style={{ cursor: "pointer" }}>
                logout
              </div>
              <Link href="/archives">archives</Link>
              <span>&nbsp;</span>

              <Link href="/users">users</Link>
              <span>&nbsp;</span>
              <Link href="#">post</Link>
            </div>
          ) : (
            <div>
              <Link href="/login">login</Link>
              <span>&nbsp;</span>
              <Link href="/signup">signup</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
