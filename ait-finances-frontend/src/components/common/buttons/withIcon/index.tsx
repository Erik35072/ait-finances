import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { TERipple } from "tw-elements-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  Icon: IconType;
  classes?: string;
  isLoading?: boolean;
}

export default function ButtonWithIcon({ Icon, title, classes, isLoading, ...props }: Props) {
  return (
    <TERipple rippleColor="light">
      <button
        type="button"
        className={`flex items-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:opacity-[0.9] ${
          classes ?? ""
        }`}
        disabled={isLoading}
        {...props}
      >
        <Icon className="mr-1 h-4 w-4" />
        {isLoading ? "Loading..." : title}
      </button>
    </TERipple>
  );
}
