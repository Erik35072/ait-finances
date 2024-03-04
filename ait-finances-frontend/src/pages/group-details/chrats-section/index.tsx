import { Group } from "@api/courses/groups";
import { TEChart } from "tw-elements-react";

type Props = { group: Group };

export default function ChartsSection({ group }: Props) {
  return (
    <section className="pr-5">
      <TEChart
        type="pie"
        style={{ maxWidth: "100%", maxHeight: "250px" }}
        data={{
          labels: ["Paid", "Not paid"],
          datasets: [
            {
              data: [group?.paidFeesTotal ?? 0, group?.notPaidFeesTotal ?? 0],
              backgroundColor: ["rgba(6, 214, 6, 1)", "rgba(7, 122, 237, 1)"]
            }
          ]
        }}
      />
    </section>
  );
}
