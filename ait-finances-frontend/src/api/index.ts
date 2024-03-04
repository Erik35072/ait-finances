import Auth from "./auth";
import Courses from "./courses";
import Groups from "./courses/groups";
import ApiSlice from "./slice";

export default class Api extends ApiSlice {
  static auth = Auth;
  static courses = Courses;
  static groups = Groups;
}
