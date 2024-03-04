import ApiSlice from "../slice";
// types
import { User } from "src/types/user";

export type LoginBody = {
  email: string;
  password: string;
};

export type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

export default class Auth extends ApiSlice {
  static baseUrl = ApiSlice.baseUrl + "/api/user";

  static Login = (body: LoginBody) => this.request<User>("/login", "POST", body);
  static SignUp = (body: SignUpBody) => this.request<User>("/signup", "POST", body);
}
