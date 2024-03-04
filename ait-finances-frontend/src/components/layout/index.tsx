import { ReactNode } from "react";
import Logo from "./bar/logo";
import Navbar from "./bar/navbar";
import Header from "./header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col space-y-3 grow-0 w-48 bg-slate-700">
        <div className="shadow-[0_0_5px_0] py-2">
          <Logo />
        </div>
        <Navbar />
      </div>
      <div className="grow">
        <Header />
        <div className="pt-2 pl-2">{children}</div>
      </div>
    </div>
  );
}
