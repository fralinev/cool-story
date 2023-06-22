import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar-outer-container">
      <div className="navbar-inner-container">
        <h2>Cool story bruh...</h2>
        <div className="navbar-menu-items">
          <Link href="/login">login</Link>
          <Link href="/signup">signup</Link>
          <h4>post</h4>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
