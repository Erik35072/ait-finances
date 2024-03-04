import { Link } from "react-router-dom";

type Props = {
  path: string;
  title: string;
};

export default function NavLink({ path, title }: Props) {
  return (
    <li className="px-2 text-slate-300 hover:text-slate-400 transition duration-500">
      <Link to={path}>{title}</Link>
    </li>
  );
}
