import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserService } from 'src/service/user/user.service';
import { User } from 'src/schemas/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findActiveUsers(): Promise<User[]>;
    findActiveUsersWithPagination(page: number, limit: number): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findActiveUserById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
}
