import { ForbiddenException } from '@nestjs/common';
import { JwtRefreshStrategy } from '@/auth/strategies/jwt-refresh.strategy';
import { userMock } from '@/user/constant';
import { UserEntity } from '@/user/entities/user.entity';
import { TokenPayloadDto, TokenPayloadExtendedDto } from '@/auth/types';
import { tokenPayloadMock } from '@/auth/constants';
import { Request } from 'express';
import { verify } from 'argon2';
import Mock = jest.Mock;
import { UserServiceAdapter } from '@/auth/adapters/user-service.adapter';

jest.mock('argon2');

describe('JwtRefreshStrategy', () => {
  let jwtRefreshStrategy: JwtRefreshStrategy;
  let userService: UserServiceAdapter;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    userService = new UserServiceAdapter();
    jwtRefreshStrategy = new JwtRefreshStrategy(userService);
    jest.resetModules();
  });

  describe('validate', () => {
    test('возвращает содержимое токена при успешной проверке токена валидации и рефреш токена', async () => {
      const user: UserEntity = {
        ...userMock,
        id: '1',
        email: 'test@example.com',
        refreshToken: 'valid_refresh_token_correct',
      };
      const tokenPayload: TokenPayloadDto = {
        ...tokenPayloadMock,
        sub: '1',
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const req: Request = { get: () => 'Bearer valid_refresh_token' };
      const findUserSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(user);
      const verifyHashSpy = (verify as Mock).mockResolvedValue(true);

      const tokenActual = await jwtRefreshStrategy.validate(req, tokenPayload);

      expect(findUserSpy).toHaveBeenCalledWith(tokenPayload.sub);
      expect(verifyHashSpy).toHaveBeenCalledWith(
        user.refreshToken,
        'valid_refresh_token',
      );
      expect(tokenActual).toEqual({
        ...tokenPayload,
        refreshToken: 'valid_refresh_token',
      });
    });
    test('возвращает ошибку ForbiddenException при ошибочной проверке токена валидации и рефреш токена', async () => {
      const user: UserEntity = {
        ...userMock,
        id: '1',
        email: 'test@example.com',
        refreshToken: 'valid_refresh_token_mistaken',
      };
      const tokenPayload: TokenPayloadDto = {
        ...tokenPayloadMock,
        sub: '1',
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const req: Request = { get: () => 'Bearer valid_refresh_token' };

      const findUserSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(user);
      const verifyHashSpy = (verify as Mock).mockResolvedValue(false);

      try {
        await jwtRefreshStrategy.validate(req, tokenPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
      expect(findUserSpy).toHaveBeenCalledWith(tokenPayload.sub);
      expect(verifyHashSpy).toHaveBeenCalledWith(
        user.refreshToken,
        'valid_refresh_token',
      );
    });

    test('возваращает ошибку ForbiddenException при отсутсвии токена рефреша в запросе', async () => {
      const tokenPayload: TokenPayloadExtendedDto = {
        ...tokenPayloadMock,
        sub: '2',
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const req: Request = { get: () => '' };

      try {
        await jwtRefreshStrategy.validate(req, tokenPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });

    test('возваращает ошибку ForbiddenException при отсутсвии пользователя из токена в системе', async () => {
      const tokenPayload: TokenPayloadExtendedDto = {
        ...tokenPayloadMock,
        sub: '2',
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const req: Request = { get: () => 'Bearer valid_refresh_token' };

      const findUserSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(null);

      try {
        await jwtRefreshStrategy.validate(req, tokenPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
      expect(findUserSpy).toHaveBeenCalledWith(tokenPayload.sub);
    });
  });
});
