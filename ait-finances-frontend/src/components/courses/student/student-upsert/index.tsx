import { useCallback, useState } from "react";
// formik
import { FormikProvider, useFormik } from "formik";
// components
import { Checkbox, Switch, TextField } from "@common-components/control";
import { StudentBody } from "@api/courses/students";
import { SimpleBtn } from "@common-components/buttons";
// utils
import * as Yup from "yup";
import { longString, shortString } from "@utils/form-errors";

type Props = {
  onAdd: (student: StudentBody) => void;
  closeModal: () => void;
};

const StudentSchema = Yup.object().shape({
  name: Yup.string()
    .min(...shortString)
    .max(...longString)
    .required("Field is required"),
  surname: Yup.string()
    .min(...shortString)
    .max(...longString)
    .required("Field is required"),
  feeAmount: Yup.number().typeError("Should ne number").min(0, "Should be positive number").required("Field is required")
});

export default function StudentUpsert({ onAdd, closeModal }: Props) {
  const [saveFormState, setSaveFormState] = useState(false);

  const formik = useFormik<StudentBody>({
    initialValues: {
      name: "",
      surname: "",
      feeAmount: "",
      isFeePaid: false
    },
    onSubmit: (values, { resetForm }) => {
      onAdd(values);
      closeModal();
      if (!saveFormState) resetForm();
    },
    validationSchema: StudentSchema,
    validateOnBlur: false,
    validateOnChange: false
  });

  const handleSaveFormState = useCallback((checked: boolean) => {
    setSaveFormState(checked);
  }, []);

  const { handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <TextField field_key="name" label="Name" />
          <TextField field_key="surname" label="Surname" />
          <TextField field_key="feeAmount" label="Fee amount" />
          <div>
            <Checkbox field_key="isFeePaid" label="Is fee paid?" />
          </div>
          <Switch checked={saveFormState} onChange={handleSaveFormState} />
          <SimpleBtn type="submit">Add student</SimpleBtn>
        </div>
      </form>
    </FormikProvider>
  );
}
