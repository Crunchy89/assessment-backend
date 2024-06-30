import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
    @ApiProperty({ example: 'test@gmail.com', description: 'The email of the user' })
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string;
    @ApiProperty({ example: 'test123', description: 'The password of the user' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}