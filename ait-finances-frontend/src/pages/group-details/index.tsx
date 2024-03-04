import Api from "@api/index";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// components
import { WrapWithNoResult, WrapWithLoading } from "@common-components/wrappers";
import { Group } from "@api/courses/groups";
import ChartsSection from "./chrats-section";
import StudentsTable from "./students-table";
import AdditionalDetails from "./addtional-details";
import UpdateGroupButton from "./update-group-button";

export default function GroupDetails() {
  const { groupId, courseId } = useParams();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.groups.get(courseId ?? "", groupId ?? "");
      if (data) {
        setGroup(data);
        setLoading(false);
      } else {
        navigate(-1);
        enqueueSnackbar({ message: `This group not working`, variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar({ message: `${error}`, variant: "error" });
    }
  }, [courseId, groupId]);

  return (
    <div className="pb-10">
      <WrapWithLoading loading={loading}>
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-center my-5 text-slate-800">{group?.title}</h1>
          <div className="flex justify-between">
            <div className="flex  space-x-16">
              <ChartsSection group={group as Group} />
              <AdditionalDetails group={group as Group} />
            </div>
            <div className="pr-5">
              <UpdateGroupButton group={group as Group} courseId={courseId ?? ""} refetch={getGroup} />
            </div>
          </div>
          <hr />
          <div>
            <h1 className="mb-3 text-center text-3xl font-mono">Students list</h1>
            <WrapWithNoResult length={group?.students?.length ?? 0}>
              <StudentsTable group={group as Group} />
            </WrapWithNoResult>
          </div>
        </div>
      </WrapWithLoading>
    </div>
  );
}
