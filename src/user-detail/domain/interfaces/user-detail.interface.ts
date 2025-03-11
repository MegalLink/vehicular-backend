export interface IUserDetail {
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  identityDocumentNumber: string;
  identityDocumentType: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
