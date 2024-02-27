import { UserEntity } from '@/user/user.entity';

export const userMock: UserEntity = {
  id: '121kjdksls',
  firstName: 'John',
  lastName: 'Doe',
  passwordHash: 'hashed_password_example',
  phone: '+1234567890',
  email: 'john.doe@example.com',
  country: 'USA',
  city: 'New York',
  address: '123 Main St',
  avatarUrl: 'http://example.com/avatar.jpg',
  refreshToken: null,
  birthday: new Date('1999-02-27T07:51:27.826'),
  updatedAt: new Date('2024-02-27T07:51:27.826'),
  createdAt: new Date('2024-02-20T07:51:27.826'),
};
