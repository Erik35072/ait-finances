import { memo, useCallback, useEffect, useState } from "react";
import Api from "@api/index";
// types
import { Course } from "@api/courses";
// components
import { Group } from "@api/courses/groups";
import WrapWithLoading from "@common-components/wrappers/wrap-with-loading";
import WrapWithNoResult from "@common-components/wrappers/wrap-with-no-result";
import { GroupCard, GroupUpsert } from "../groups";
import { AddButton } from "@common-components/buttons";
import { BaseModal } from "@common-components/modal";
// icons

type Props = {
  title: string;
  course?: Course;
};

const CourseSection = ({ course }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const getGroups = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data } = await Api.groups.getAll(id);
      if (data) {
        setGroups(data.groups);
        setLoading(false);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const onAddGroupModalClose = useCallback(() => {
    setShowAddGroupModal(false);
  }, []);

  const onAddGroupModalOpen = useCallback(() => {
    setShowAddGroupModal(true);
  }, []);

  useEffect(() => {
    if (course) {
      getGroups(course._id);
    }
  }, [getGroups, course]);

  return (
    <>
      <AddButton title="Add new group" onClick={onAddGroupModalOpen} />
      <div className="flex gap-5 mt-3 flex-wrap">
        <WrapWithLoading loading={loading}>
          <WrapWithNoResult length={groups.length}>
            {groups.map(group => (
              <GroupCard key={group._id} group={group} refetch={getGroups} courseId={course?._id ?? ""} />
            ))}
          </WrapWithNoResult>
        </WrapWithLoading>
      </div>
      <BaseModal show={showAddGroupModal} onClose={onAddGroupModalClose} title="Add new group">
        <GroupUpsert mode="add" refetchGroups={getGroups} closeModal={onAddGroupModalClose} courseId={course?._id ?? ""} />
      </BaseModal>
    </>
  );
};

export default memo(CourseSection);
