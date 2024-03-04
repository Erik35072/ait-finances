import classNames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  theme?: "primary" | "red" | "green";
}

export default function Submit({ children, isLoading, theme = "primary", ...props }: PropsWithChildren<Props>) {
  const selectTheme = () => {
    switch (theme) {
      case "primary":
        return "bg-primary text-white focus:bg-primary-600 hover:bg-primary-600 active:bg-primary-700";
      case "red":
        return "bg-red-500 text-white focus:bg-red-600 hover:bg-red-600 active:bg-red-700";
      case "green":
        return "bg-green-500 text-white focus:bg-green-600 hover:bg-green-600 active:bg-green-700";
      default:
        return "bg-primary text-white focus:bg-primary-600 hover:bg-primary-600 active:bg-primary-700";
    }
  };

  return (
    <button
      className={classNames(
        "ml-1 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]",
        selectTheme()
      )}
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
}
