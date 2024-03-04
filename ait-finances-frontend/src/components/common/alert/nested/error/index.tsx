type Props = {
  text: string;
  show: boolean;
};

export default function Error({ text, show }: Props) {
  return show ? (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold text-md">Error!</p>
      <p className="text-sm">{text}</p>
    </div>
  ) : null;
}
