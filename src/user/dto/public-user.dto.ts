import { UserEntity } from '../entities/user.entity';

export class PublicUserDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string | null;
  city: string | null;
  birthday: Date | null;
  address: string | null;
  avatarUrl: string | null;
  profile: {
    id: string;
  };

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.country = user.country;
    this.city = user.city;
    this.birthday = user.birthday;
    this.address = user.address;
    this.avatarUrl = user.avatarUrl;
    this.profile = user.profile;
  }
}
