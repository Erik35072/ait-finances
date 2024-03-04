import { useCallback, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { TextField } from "@common-components/control";
import { AddButton, SimpleBtn } from "@common-components/buttons";
import { BaseModal } from "@common-components/modal";
import { StudentUpsert } from "@components/courses/student";
import { Group, GroupBody } from "@api/courses/groups";
import { StudentBody } from "@api/courses/students";
import { TableHead, TableSimpleCell } from "@common-components/table";
import { tableCellNames } from "@providers/table-data/students";
// utils
import * as Yup from "yup";
import { longString, shortString } from "@utils/form-errors";
import Api from "@api/index";
import { useSnackbar } from "notistack";

type Props = {
  mode: "add" | "update";
  group?: Group;
  courseId: string;
  refetchGroups: (courseId: string) => void;
  closeModal: () => void;
};

const GroupSchema = Yup.object().shape({
  title: Yup.string()
    .min(...shortString)
    .max(...longString)
    .required("Field is required")
});

export default function GroupUpsert({ group, mode, courseId, closeModal, refetchGroups }: Props) {
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik<GroupBody>({
    initialValues: {
      title: group?.title ?? "",
      students: group?.students ?? []
    },
    onSubmit: (values, { resetForm }) => {
      if (mode === "add") handleGroupUpsert(courseId, values, "add");
      else handleGroupUpsert(courseId, values, "update");
      resetForm();
    },
    validationSchema: GroupSchema,
    validateOnBlur: false,
    validateOnChange: false
  });

  const { values, handleSubmit, setFieldValue } = formik;

  async function handleGroupUpsert(courseId: string, values: GroupBody, mode: "add" | "update") {
    try {
      setLoading(true);
      const { data, error } =
        mode === "add" ? await Api.groups.add(courseId, values) : await Api.groups.update(courseId, group?._id ?? "", values);
      if (data) {
        enqueueSnackbar({ message: `Group is ${mode === "add" ? "added" : "updated"}`, variant: "success" });
        refetchGroups(courseId);
        closeModal();
      } else {
        enqueueSnackbar({ message: error?.message ?? "", variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar({ message: `${error}` ?? "", variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  const onAddStudentModalClose = useCallback(() => {
    setAddStudentModal(false);
  }, []);

  const onAddStudentModalOpen = useCallback(() => {
    setAddStudentModal(true);
  }, []);

  const handelStudentAdd = useCallback(
    (newStudent: StudentBody) => {
      setFieldValue("students", [...values.students, newStudent]);
    },
    [setFieldValue, values]
  );

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-5">
          <TextField field_key="title" label="Title" placeholder="Enter group title" />
          <hr />
          <div className="flex justify-end">
            <AddButton type="button" title="Add student" onClick={onAddStudentModalOpen} />
          </div>
          <table className="w-full">
            <TableHead cellNames={tableCellNames} />
            <tbody className="border">
              {values.students.map(({ name, surname, isFeePaid, feeAmount }, i) => (
                <tr key={`${name}_${surname}_${i}`}>
                  <TableSimpleCell content={name} />
                  <TableSimpleCell content={surname} />
                  <TableSimpleCell content={feeAmount} />
                  <TableSimpleCell content={isFeePaid ? "Paid" : "Not paid"} />
                  <TableSimpleCell content={"Actions"} />
                </tr>
              ))}
            </tbody>
          </table>
          {!values.students.length && (
            <div className="flex justify-center py-5 border-t border-black">
              <h2 className="font-bold text-2xl italic">Students not added yet</h2>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <SimpleBtn isLoading={loading}>{mode === "add" ? "Add group" : "Update group"}</SimpleBtn>
        </div>
      </form>
      <BaseModal show={addStudentModal} onClose={onAddStudentModalClose} title="Add new student">
        <StudentUpsert onAdd={handelStudentAdd} closeModal={onAddStudentModalClose} />
      </BaseModal>
    </FormikProvider>
  );
}
