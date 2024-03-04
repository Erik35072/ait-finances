import { Group } from "@api/courses/groups";
import { Table, TableHead, TableSimpleCell } from "@common-components/table";
// utils
import { tableCellNames } from "@providers/table-data/students";

type Props = { group: Group };

export default function StudentsTable({ group }: Props) {
  return (
    <Table>
      <TableHead cellNames={tableCellNames} />
      <tbody>
        {group?.students?.map(({ name, surname, isFeePaid, feeAmount }, i) => (
          <tr className="border-b" key={`${name}_${surname}_${i}`}>
            <TableSimpleCell content={name} />
            <TableSimpleCell content={surname} />
            <TableSimpleCell content={feeAmount} />
            <TableSimpleCell content={isFeePaid ? "Paid" : "Not paid"} />
            <TableSimpleCell content={"Actions"} />
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}></td>
          <TableSimpleCell content={group?.totalFees ?? 0} className="border-l" />
        </tr>
      </tfoot>
    </Table>
  );
}
