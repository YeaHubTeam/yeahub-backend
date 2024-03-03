import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userMock } from '@/user/constant';
import { verify } from 'argon2';
import Mock = jest.Mock;
import { JWT_KEYS, tokenPayloadMock } from '@/auth/constants';

jest.mock('argon2');

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();
    authService = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  describe('validateUser', () => {
    test('возвращает данные пользователя при успешном сопоставлении логина и пароля', async () => {
      const user = { ...userMock, passwordHash: '$###$' };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userPublicExpected } = user;
      const findUserSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(user);
      const verifyHashSpy = (verify as Mock).mockResolvedValue(true);

      const userPublicActual = await authService.validateUser(
        'gzennurov@mail.ru',
        'qwerty123',
      );

      expect(findUserSpy).toHaveBeenCalledWith('gzennurov@mail.ru');
      expect(verifyHashSpy).toHaveBeenCalledWith(
        user.passwordHash,
        'qwerty123',
      );
      expect(userPublicActual).toEqual(userPublicExpected);
    });
    test('возвращает null при неудачном сопоставлении логина и пароля', async () => {
      const user = { ...userMock, passwordHash: '$###$' };
      const findUserSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(user);
      const verifyHashSpy = (verify as Mock).mockResolvedValue(false);

      const userPublicActual = await authService.validateUser(
        'gzennurov@mail.ru',
        'qwerty123',
      );

      expect(findUserSpy).toHaveBeenCalledWith('gzennurov@mail.ru');
      expect(verifyHashSpy).toHaveBeenCalledWith(
        user.passwordHash,
        'qwerty123',
      );
      expect(userPublicActual).toEqual(null);
    });
    test('возвращает null при неудачном идентификации пользователя по логину', async () => {
      const findUserSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(null);

      const userPublicActual = await authService.validateUser(
        'gzennurov@mail.ru',
        'qwerty123',
      );

      expect(findUserSpy).toHaveBeenCalledWith('gzennurov@mail.ru');
      expect(userPublicActual).toEqual(null);
    });
  });

  describe('signTokens', () => {
    test('получение токенов аутентификации и рефреша при выдаче токенов', async () => {
      jest.spyOn(jwtService, 'signAsync').mockImplementation((_, options) => {
        if (options.secret === JWT_KEYS.REFRESH_SECRET) {
          return Promise.resolve('refresh_token');
        } else if (options.secret === JWT_KEYS.ACCESS_SECRET) {
          return Promise.resolve('access_token');
        }
      });
      const updateTokenSpy = jest.spyOn(authService, 'updateRefreshToken');
      const tokenPayload = { ...tokenPayloadMock };

      const tokensActual = await authService.signTokens(tokenPayload);

      expect(updateTokenSpy).toHaveBeenCalledWith(
        tokenPayload.sub,
        'refresh_token',
      );
      expect(tokensActual).toEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
    });
  });
});
