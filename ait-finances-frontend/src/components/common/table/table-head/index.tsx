interface Props {
  cellNames: { id: number; title: string }[];
}

export default function CustomTableHead({ cellNames }: Props) {
  return (
    <thead>
      <tr className="border">
        {cellNames.map(({ id, title }) => (
          <th className="border-r p-3 text-xl" key={`${title}_${id}`}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
