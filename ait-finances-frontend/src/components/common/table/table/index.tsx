import { PropsWithChildren } from "react";

export default function Table({ children }: PropsWithChildren) {
  return (
    <div className="border overflow-hidden rounded-xl shadow-xl">
      <table className="w-full bg-slate-300">{children}</table>
    </div>
  );
}
