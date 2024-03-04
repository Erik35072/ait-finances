import { Group } from "@api/courses/groups";

type Props = { group: Group };

export default function AdditionalDetails({ group }: Props) {
  return (
    <div className="flex flex-col space-y-3 [&>*]:italic">
      <h3 className="text-xl">
        Students count : <span className="font-bold">{group?.students.length}</span>
      </h3>
      <h3 className="text-xl">
        Total fee : <span className="font-bold">{group?.totalFees}</span>
      </h3>
      <h3 className="text-xl">
        Available fee : <span className="font-bold">{(group?.totalFees ?? 0) - (group?.notPaidFeesTotal ?? 0)}</span>
      </h3>
      <h3 className="text-xl">
        Should pay fee : <span className="font-bold">{(group?.totalFees ?? 0) - (group?.paidFeesTotal ?? 0)}</span>
      </h3>
    </div>
  );
}
