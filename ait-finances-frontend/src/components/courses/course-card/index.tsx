interface Props {
  date?: string;
  title?: string;
  amountSpent?: string;
  amountAvailable?: string;
}

const ExpenseCard = ({ date, title, amountSpent, amountAvailable }: Props) => {
  return (
    <div className="max-w-sm bg-white border rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{date}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">Fee Should be: {amountSpent}</p>
        <p className="text-gray-700 text-base">Fee Available: {amountAvailable}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
