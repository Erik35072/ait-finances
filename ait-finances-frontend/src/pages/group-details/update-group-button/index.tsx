import { useModalHandlers } from "@utils/hooks";
// components
import { ButtonWithIcon } from "@common-components/buttons";
import { BaseModal } from "@common-components/modal";
import { GroupUpsert } from "@components/courses/groups";
// icons
import { MdOutlineEdit } from "react-icons/md";
// class
import { Group } from "@api/courses/groups";

interface Props {
  group: Group;
  refetch: () => void;
  courseId: string;
}

export default function UpdateGroupButton({ refetch, group, courseId }: Props) {
  const { isOpen, close, open } = useModalHandlers();

  return (
    <>
      <ButtonWithIcon onClick={open} Icon={MdOutlineEdit} title="Update group" classes="bg-blue-500 text-white" />
      <BaseModal show={isOpen} onClose={close} title="Update group">
        <GroupUpsert mode="update" group={group} refetchGroups={refetch} closeModal={close} courseId={courseId ?? ""} />
      </BaseModal>
    </>
  );
}
