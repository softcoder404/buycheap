import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty({message: 'Email field can\'t be empty'})
    @IsEmail()
    email: string;
    @IsNotEmpty({message: 'Password field can\'t be empty'})
    password: string;
}