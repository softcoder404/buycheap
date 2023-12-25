import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Roles } from "src/utils/common/user_roles.enum";

export class CreateUserDto {
    @IsNotEmpty({message: 'Email field can\'t be empty'})
    @IsString()
    name: string;
    @IsNotEmpty({message: 'Email field can\'t be empty'})
    @IsEmail({},{message: 'Invalid email address'})
    email: string;
    @MinLength(8,{message: 'Password must be 8 characters long'})
    password: string;
    roles: Roles[];
}
