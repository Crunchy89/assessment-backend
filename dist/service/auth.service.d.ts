import { UserService } from './user.service';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(auth: AuthDto): Promise<{
        access_token: string;
    }>;
}
