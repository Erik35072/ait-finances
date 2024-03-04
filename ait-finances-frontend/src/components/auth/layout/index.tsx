import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  additionToText?: string;
};

export default function AuthLayout({ children, title = "AIT Finances", additionToText = "" }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-5">
      <h1 className="text-2xl">{`${title} ${additionToText}`}</h1>
      <div>{children}</div>
    </div>
  );
}
