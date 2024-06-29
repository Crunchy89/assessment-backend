import { AuthDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/service/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: AuthDto): Promise<{
        access_token: string;
    }>;
}
