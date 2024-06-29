import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class UpdateNameUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
}
export class UpdatePasswordUserDto {
    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;
    @IsString()
    @IsNotEmpty()
    readonly retypePassword: string;
    @IsString()
    @IsNotEmpty()
    readonly newPassword: string;
}