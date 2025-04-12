export interface User {
  _id?: string;
  email: string;
  pin: string;
  password: string;
  resetPinKey: string;
  requirePinChange: boolean;
  resetPasswordKey: string;
  requirePasswordChange: boolean;
  phone: string;
  waBotPhone: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name: string;
  lastLogin: Date;
  lastPasswordReset: Date;
  roles: string[];
  status: string;
  address: string;
  createdBy: string;
  completeness: number;
  botActive: boolean;
  eacNumber: string;
}
