import { CreateUserDto, UpdateNameUserDto, UpdatePasswordUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/service/user.service';
import { User } from 'src/schemas/user.schema';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    updateName(id: string, name: UpdateNameUserDto): Promise<User>;
    updatePassword(id: string, updatePasswordUserDto: UpdatePasswordUserDto): Promise<User>;
    findActiveUsers(): Promise<User[]>;
    findActiveUsersWithPagination(page: number, limit: number): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findActiveUserById(id: string): Promise<User>;
    delete(id: string): Promise<User>;
}
