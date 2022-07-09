export const jwtConstants = {
  secret: 'secretKey',
};

export const UserRoles = ['SU_ADMIN', 'ADMIN', 'ADVERTISER'];

export enum Role {
  SU_ADMIN = 'SU_ADMIN',
  ADMIN = 'ADMIN',
  ADVERTISER = 'ADVERTISER',
}

export const SUPER_USER = {
  userName: 'superadmin',
  email: 'superadmin@instore.com',
  firstName: 'Admin',
  lastName: 'Admin',
  middleName: '',
  name: 'Administrator',
  status: 'active',
  roles: ['admin'],
  pin: '0000',
  password: 'admin',
  address: '',
  requirePinChange: true,
  requirePasswordChange: true,
};
