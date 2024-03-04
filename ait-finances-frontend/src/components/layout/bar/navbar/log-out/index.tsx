import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { userSignOut } from "@providers/redux/slices";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    dispatch(userSignOut());
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <li className="px-2 cursor-pointer text-slate-300 hover:text-slate-400 transition duration-500" onClick={handleLogout}>
      Log out
    </li>
  );
}
