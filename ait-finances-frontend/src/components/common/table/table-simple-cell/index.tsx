import { TdHTMLAttributes } from "react";

interface Props extends TdHTMLAttributes<HTMLTableCellElement> {
  content: string | number;
}

export default function TableSimpleCell({ content, className, ...props }: Props) {
  return (
    <td className={"border-r text-center p-1 font-serif " + className} {...props}>
      {content}
    </td>
  );
}
