export class ResponseUserDbDto {
  _id: string;
  email: string;
  userName: string;
  password: string;
  isActive: boolean;
  roles: string[];
  isEmailConfirmed: boolean;
  confirmationToken: string;
}
