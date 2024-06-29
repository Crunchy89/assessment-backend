import { CreateUserDto, UpdateNameUserDto } from 'src/dto/user.dto';
import { Model } from "mongoose";
import { User } from 'src/schemas/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findActiveUsers(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findActiveUserById(id: string): Promise<User>;
    findActiveUserByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateNameUserDto): Promise<User>;
    updateName(id: string, updateNameUserDto: UpdateNameUserDto): Promise<User>;
    updatePassword(id: string, newPassword: string): Promise<User>;
    delete(id: string): Promise<User>;
    findActiveUsersWithPagination(page: number, limit: number): Promise<User[]>;
}
