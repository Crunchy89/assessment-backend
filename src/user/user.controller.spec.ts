import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User, UserSchema } from './user.schema';
import { AuthGuard } from '../auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test'), // Replace with your MongoDB connection string
                MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
            ],
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = {
                email: "test@gmail.com",
                password: "test123",
            };

            const expectedResult: User = {
                email: createUserDto.email,
                password: await bcrypt.hash(createUserDto.password, 10),
                createdAt: new Date(),
                updatedAt: new Date(),
                isDeleted: false,
            };

            jest.spyOn(userService, 'create').mockResolvedValue(expectedResult);

            const result = await userController.create(createUserDto);

            expect(result).toEqual(expectedResult);
            expect(userService.create).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const expectedResult: User[] = [];

            jest.spyOn(userService, 'findAll').mockResolvedValue(expectedResult);

            const result = await userController.findAll();

            expect(result).toEqual(expectedResult);
            expect(userService.findAll).toHaveBeenCalled();
        });
    });

    // Add more test cases for other methods in UserController

});