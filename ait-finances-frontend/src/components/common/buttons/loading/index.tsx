import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  title: string;
}

// TODO remove unnecessary buttons

export default function LoadingButton({ isLoading, title, ...props }: Props) {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : title}
    </button>
  );
}
