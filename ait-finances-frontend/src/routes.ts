import Main from "./pages/dashboard/main";
import Courses from "./pages/courses";
import GroupDetails from "./pages/group-details";
import { SignIn, SignUp } from "./pages/auth";

interface Routes {
  path: string;
  Component: () => JSX.Element;
  permission: "protected" | "unprotected";
}

const routes: Routes[] = [
  { path: "/", Component: SignIn, permission: "unprotected" },
  { path: "/sign-up", Component: SignUp, permission: "unprotected" },
  { path: "/dashboard", Component: Main, permission: "protected" },
  { path: "/courses", Component: Courses, permission: "protected" },
  { path: "/group-details/:courseId/:groupId", Component: GroupDetails, permission: "protected" }
];

export default routes;
