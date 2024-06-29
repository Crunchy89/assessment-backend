import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class AuthDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}