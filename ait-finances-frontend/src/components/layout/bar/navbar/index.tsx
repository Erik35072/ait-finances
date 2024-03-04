import Logout from "./log-out";
import NavLink from "./nav-link";

export default function Navbar() {
  return (
    <ul className="flex flex-col space-y-2">
      <NavLink title="Home" path="/dashboard" />
      <NavLink title="Courses" path="/courses" />
      <Logout />
    </ul>
  );
}
