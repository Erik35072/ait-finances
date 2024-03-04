import { FaUserCircle } from "react-icons/fa";
// redux
import { useSelector } from "react-redux";
import { getUserFullInformation } from "../../../providers/redux/slices";

export default function Header() {
  const user = useSelector(getUserFullInformation);
  return (
    <header className="px-2 min-h-[56px] shadow-[0_0_5px_0] bg-slate-300 flex justify-between items-center text-slate-500">
      <div className="flex items-center space-x-2">
        <FaUserCircle />
        <h2>{user?.email}</h2>
      </div>
    </header>
  );
}
