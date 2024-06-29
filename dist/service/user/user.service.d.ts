import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { Model } from "mongoose";
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { User } from 'src/schemas/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findActiveUsers(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findActiveUserById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
    findActiveUsersWithPagination(page: number, limit: number): Promise<User[]>;
}
