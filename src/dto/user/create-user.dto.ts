import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    readonly name?: string;
    @IsString()
    @MaxLength(50)
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}