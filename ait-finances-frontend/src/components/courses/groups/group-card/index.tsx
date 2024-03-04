import { memo, useCallback, useState } from "react";
// components
import { ButtonWithIcon } from "@common-components/buttons";
// icons
import { MdDelete } from "react-icons/md";
import { MdOutlineReadMore } from "react-icons/md";
import { BaseModal } from "@common-components/modal";
import { Group } from "@api/courses/groups";
import Api from "@api/index";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

type Props = {
  courseId: string;
  group: Group;
  refetch: (courseId: string) => void;
};

function GroupCard({ group, courseId, refetch }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGroupRemove = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await Api.groups.remove(courseId, group._id);
      if (data) {
        enqueueSnackbar({ message: `The « ${group.title} » group was deleted`, variant: "success" });
        refetch(courseId);
        setDeleteModal(false);
      } else {
        enqueueSnackbar({ message: error?.message, variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar({ message: `${error}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [courseId, group]);

  const handleDeleteModalOpen = useCallback(() => {
    setDeleteModal(true);
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    setDeleteModal(false);
  }, []);

  return (
    <div className="relative p-3 min-w-[400px] rounded-lg overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 bg-slate-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.title}</div>
        <p className="text-gray-700 text-base">13/01/2024</p>
      </div>
      <div className="flex justify-end space-x-2">
        <ButtonWithIcon
          Icon={MdDelete}
          onClick={handleDeleteModalOpen}
          isLoading={loading}
          title="Remove"
          classes="bg-red-500 text-white"
        />
        <Link to={`/group-details/${courseId}/${group._id}`}>
          <ButtonWithIcon Icon={MdOutlineReadMore} title="Show more" classes="bg-blue-500 text-white" />
        </Link>
      </div>

      <BaseModal
        dialogProps={{ size: undefined, centered: true }}
        show={deleteModal}
        withPortal
        onClose={handleDeleteModalClose}
        actionTitle="Remove"
        onAction={handleGroupRemove}
      >
        <h1 className="text-center text-2xl">
          Are you sure to delete <span className="whitespace-nowrap font-bold">« {group.title} »</span> group
        </h1>
      </BaseModal>
    </div>
  );
}

export default memo(GroupCard);
