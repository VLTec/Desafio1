import { User } from '../../../../../modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): UserRaw {
    return {
      id: Number(user.id),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(userRaw: UserRaw): User {
    return new User(
      {
        email: userRaw.email,
        name: userRaw.name,
        password: userRaw.password,
        createdAt: userRaw.createdAt,
        updatedAt: userRaw.updatedAt,
      },
      userRaw.id.toString(),
    );
  }
}
