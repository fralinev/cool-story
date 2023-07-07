import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { anon } from "../context/UserContext";

const Navbar = ({ currentUser }: any) => {
  const { setCurrentUser } = useContext(UserContext);
  const handleLogout = () => {
    window.location.reload();
  };
  return (
    <div className="navbar-outer-container">
      <div className="navbar-inner-container">
        <h2>
          Cool story,{" "}
          {currentUser.username !== "anon"
            ? `${currentUser.username}...`
            : "bruh..."}
        </h2>
        <div className="navbar-menu-items">
          {currentUser.username !== "anon" ? (
            <div>
              <div onClick={handleLogout} style={{ cursor: "pointer" }}>
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
