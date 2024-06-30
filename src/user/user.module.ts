import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/user/user.controller';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule { }