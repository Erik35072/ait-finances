import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
  title: string;
}

export default function BaseLink({ title, ...props }: Props) {
  return (
    <Link {...props}>
      <span className="text-blue-500 hover:underline cursor-pointer">{title}</span>
    </Link>
  );
}
