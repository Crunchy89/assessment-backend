import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto);
    }

}
