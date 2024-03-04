import ApiSlice from "@api/slice";
// types
import { Student } from "../students";

export interface Group {
  _id: string;
  title?: string;
  // should be a students array <string[]> is temporary
  students: Student[];
  totalFees: number;
  paidFeesTotal: number;
  notPaidFeesTotal: number;
}

export interface GroupsResponse {
  courseId: string;
  courseTitle: string;
  groups: Group[];
}

export type GroupBody = Omit<Group, "_id" | "totalFees" | "paidFeesTotal" | "notPaidFeesTotal">;

export default class Groups extends ApiSlice {
  static baseUrl = ApiSlice.baseUrl + "/api/groups";
  static defaultAuth = true;

  static getAll = (courseId: string) => this.request<GroupsResponse>(`/${courseId}`, "GET");
  static get = (courseId: string, groupId: string) => this.request<Group>(`/${courseId}/${groupId}`, "GET");
  static add = (courseId: string, body: GroupBody) => this.request<Group>(`/${courseId}`, "POST", body);
  static remove = (courseId: string, groupId: string) => this.request<Group>(`/${courseId}/${groupId}`, "DELETE");
  static update = (courseId: string, groupId: string, body: GroupBody) =>
    this.request<Group>(`/${courseId}/${groupId}`, "PATCH", body);
}
