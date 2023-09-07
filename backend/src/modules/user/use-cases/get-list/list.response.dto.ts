import { UserEntity } from '../../entities/user.entity';

export class ListUserResponseDto {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(props: ListUserResponseDto) {
    Object.assign(this, props);
  }

  static UserEntityToDto(entity: UserEntity): ListUserResponseDto {
    return new ListUserResponseDto({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    });
  }
}
