import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  withoutIcon?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function AddButton({ title, withoutIcon, isLoading, onClick, ...props }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-center transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        disabled={isLoading}
        {...props}
      >
        {title ?? ""}
        {!withoutIcon && <IoAddCircleSharp className={`w-5 h-5 ${classNames({ "ml-2": Boolean(title) })}`} />}
      </button>
    </div>
  );
}
