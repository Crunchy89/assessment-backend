import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(auth: AuthDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findActiveUserByEmail(auth.email);
        if (!user || user.isDeleted) {
            throw new UnauthorizedException('Account not found');
        }
        if (!(await compare(auth.password, user.password))) {
            throw new UnauthorizedException('Wrong password');
        }
        const payload = { email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}