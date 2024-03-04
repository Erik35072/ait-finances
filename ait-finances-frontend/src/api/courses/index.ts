import ApiSlice from "../slice";

export type CourseType = "WD" | "GD" | "SMM" | "PM" | "X";
export interface Course {
  _id: string;
  date?: string;
  title?: string;
  type: CourseType;
}

type CourseBody = Omit<Course, "_id">;

export default class Courses extends ApiSlice {
  static baseUrl = ApiSlice.baseUrl + "/api/courses";
  static defaultAuth = true;

  static getAll = () => this.request<Course[]>("", "GET");
  static get = (id: string) => this.request<Course>(`/${id}`, "GET");
  static add = (body: CourseBody) => this.request<Course>(``, "POST", body);
  static remove = (id: string) => this.request<Course>(`/${id}`, "DELETE");
  static update = (id: string, body: CourseBody) => this.request<Course>(`/${id}`, "PATCH", body);
}
