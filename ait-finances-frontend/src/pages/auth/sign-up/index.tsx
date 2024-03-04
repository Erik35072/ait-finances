import { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// components
import { LoadingBtn } from "@common-components/buttons";
import { AuthLayout } from "@components/auth";

import { TextField } from "@common-components/control";
import { NestedErrorAlert } from "@common-components/alert/nested";
import { BaseLink } from "@common-components/link";
// api
import Api from "@api/index";
import { SignUpBody } from "@api/auth";

// redux
import { useDispatch } from "react-redux";
import { userLogin } from "@providers/redux/slices";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

// Define the login page component
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik<SignUpValues>({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: values => {
      signUp(values);
    }
  });

  const { values, handleSubmit } = formik;

  async function signUp(values: SignUpBody) {
    try {
      setLoading(true);
      const response = await Api.auth.SignUp(values);

      if (response?.data) {
        // handle sign in
        dispatch(userLogin({ user: response.data }));
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.error?.message as string);
      }
    } catch (error) {
      throw Error(error as string);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout additionToText="Sign up">
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3 bg-white p-8 rounded shadow-md w-96">
            <NestedErrorAlert text={error} show={Boolean(error)} />
            <div>
              <div className="flex flex-col space-y-5">
                <TextField field_key="name" label="Name" />
                <TextField field_key="email" label="Email" />
                <TextField field_key="password" type="password" label="Password" />
              </div>

              <div className="flex flex-col space-y-5">
                <div className="flex justify-center space-x-5">
                  <LoadingBtn title="Sign Up" isLoading={loading} disabled={!(values.email && values.password)} />
                </div>
                <div className="flex justify-end">
                  <BaseLink title="I already have account" to="/" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormikProvider>
    </AuthLayout>
  );
}
