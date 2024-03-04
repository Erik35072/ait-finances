// react
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserFullInformation } from "../../../providers/redux/slices";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  // write permission logic
  const user = useSelector(getUserFullInformation);

  return user !== null ? children : <Navigate to="/" />;
}
