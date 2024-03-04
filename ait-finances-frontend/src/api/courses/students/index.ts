export interface Student {
  _id: string;
  name: string;
  surname: string;
  feeAmount: number | "";
  isFeePaid: boolean;
}

export type StudentBody = Omit<Student, "_id">;
