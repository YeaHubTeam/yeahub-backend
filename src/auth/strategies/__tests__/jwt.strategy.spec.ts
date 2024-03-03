import { JwtStrategy } from '../jwt.strategy';
import { UserService } from '@/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { userMock } from '@/user/constant';
import { tokenPayloadMock } from '@/auth/constants';
import { TokenPayloadDto } from '@/auth/types';
import { UserEntity } from '@/user/entities/user.entity';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService: UserService;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    userService = new UserService();
    jwtStrategy = new JwtStrategy(userService);
  });

  describe('validate', () => {
    const user: UserEntity = { ...userMock, id: '1' };
    const tokenPayload: TokenPayloadDto = { ...tokenPayloadMock, sub: '1' };

    test.each([[user, tokenPayload]])(
      'возваращает пользователя при нахождении его в системе из переданного токена',
      async (user, tokenPayload) => {
        const findUserSpy = jest
          .spyOn(userService, 'findUserById')
          .mockResolvedValue(user);

        const result = await jwtStrategy.validate(tokenPayload);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...publicUser } = user;

        expect(findUserSpy).toHaveBeenCalledWith(tokenPayload.sub);
        expect(result).toEqual(publicUser);
      },
    );

    test.each([[tokenPayload, UnauthorizedException]])(
      'возварщает ошибку UnauthorizedException при отсутсвии пользователя из токена в системе',
      async (tokenPayload, exceptionClass) => {
        const findUserSpy = jest
          .spyOn(userService, 'findUserById')
          .mockResolvedValue(null);

        try {
          await jwtStrategy.validate(tokenPayload);
        } catch (error) {
          expect(error).toBeInstanceOf(exceptionClass);
        }
        expect(findUserSpy).toHaveBeenCalledWith(tokenPayload.sub);
      },
    );
  });
});
