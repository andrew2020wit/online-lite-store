export enum UserRole {
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}

export enum UserGender {
  man = 'man',
  woman = 'woman',
  notIndicated = '',
}

export class UserProfile {
  id: string;
  login: string;
  fullName: string;
  role: string;
  defaultDeliverAddress: string;
  phone: string;
  email: string;
}

export class UserEntity {
  id?: string;
  login?: string;
  fullName?: string;
  password?: string;
  role?: UserRole;
  defaultDeliverAddress?: string;
  email?: string;
  phone?: string;
  gender?: UserGender;
  language?: string;
  birthday?: Date;
  isActive?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
