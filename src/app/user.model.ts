export interface User {
  $key: string;
  name: string;
  fatherName: string;
  motherName: string;
  address: string;
  activities: string[];
  mobile: number;
  branch: string;
  branchCode: string;
  gender: string;
  registraionDate: string;
  contents?: string;
}
