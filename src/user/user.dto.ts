import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: '', description: 'The email of the user' })
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string;
    @ApiProperty({ example: '', description: 'The password of the user' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class UpdateNameUserDto {
    @ApiProperty({ example: '', description: 'The name of the user' })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
}
export class UpdatePasswordUserDto {
    @ApiProperty({ example: '', description: 'The old password of the user' })
    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;
    @ApiProperty({ example: '', description: 'The retype password of the user' })
    @IsString()
    @IsNotEmpty()
    readonly retypePassword: string;
    @ApiProperty({ example: '', description: 'The new password of the user' })
    @IsString()
    @IsNotEmpty()
    readonly newPassword: string;
}