import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockRequest = (user: any) => ({
    user,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: LocalAuthGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('POST /auth/login', () => {
    it('should call AuthService.login with the correct user', async () => {
      const mockUser = { username: 'testUser', password: 'testPass' };
      const mockLoginResponse = { access_token: 'jwt-token' };

      // Mock the response from the login method of AuthService
      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      const req = mockRequest(mockUser); // Create a mock request object
      const result = await controller.login(req);

      expect(result).toEqual(mockLoginResponse); // Expect the controller to return the login response
      expect(service.login).toHaveBeenCalledWith(mockUser); // Ensure AuthService.login was called with the correct user
    });

    it('should throw an error if the login fails', async () => {
      const mockUser = { username: 'testUser', password: 'wrongPass' };
      const error = new Error('Login failed');
      mockAuthService.login.mockRejectedValue(error);

      const req = mockRequest(mockUser);

      await expect(controller.login(req)).rejects.toThrowError('Login failed');
      expect(service.login).toHaveBeenCalledWith(mockUser);
    });
  });
});
