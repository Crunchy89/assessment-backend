import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { UserSchema } from '../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test'),
                MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
                JwtModule.register({
                    secret: 'test-secret-key',
                    signOptions: { expiresIn: '3600s' },
                }),
            ],
            controllers: [AuthController],
            providers: [AuthService, UserService],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
    });

    describe('signIn', () => {
        it('should return the result of authService.signIn', async () => {
            const signInDto: AuthDto = { email: "test@gmail.com", password: "test123" };
            const expectedResult: any = { access_token: "test" };

            jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);

            const result = await authController.signIn(signInDto);

            expect(result).toBe(expectedResult);
            expect(authService.signIn).toHaveBeenCalledWith(signInDto);
        });

        // Add more test cases for signIn if needed
    });

    // Add more test cases for other methods in AuthController if needed
});