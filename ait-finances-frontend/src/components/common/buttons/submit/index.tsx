import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
};

export default function Submit({ title, ...props }: ButtonHTMLAttributes<Props>) {
  return (
    <button
      type="submit"
      className={classNames(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline",
        {
          "opacity-50": props.disabled
        }
      )}
      {...props}
    >
      {title}
    </button>
  );
}
