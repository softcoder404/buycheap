import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto:CreateUserDto ): Promise<{user: UserEntity}> {
    const registeredUser = await this.usersService.create(createUserDto);
    return {user: registeredUser};
  }

  @Post('login')
  async login(@Body() loginUserDto:LoginUserDto ): Promise<{}> {
    const registeredUser = await this.usersService.login(loginUserDto);
    const accessToken = this.usersService.getAccessToken(registeredUser);
    return {registeredUser,accessToken};
  }



}
