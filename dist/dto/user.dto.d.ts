export declare class CreateUserDto {
    readonly email: string;
    readonly password: string;
}
export declare class UpdateNameUserDto {
    readonly name: string;
}
export declare class UpdatePasswordUserDto {
    readonly oldPassword: string;
    readonly retypePassword: string;
    readonly newPassword: string;
}
