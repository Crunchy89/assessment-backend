import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(auth: AuthDto): Promise<{ user: User, access_token: string }> {
        const user = await this.usersService.findActiveUserByEmail(auth.email);
        if (!user || user.isDeleted) {
            throw new NotFoundException('Account not found');
        }
        if (!(await compare(auth.password, user.password))) {
            throw new BadRequestException('Wrong password');
        }
        const payload = { email: user.email };
        return {
            user: user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}