import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controller/auth.controller';
import { jwtConstants } from 'src/auth/constants';
import { UserService } from 'src/service/user.service';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    providers: [AuthService, UserService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }