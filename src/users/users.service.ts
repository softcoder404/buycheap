import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {hash,compare} from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){ }


  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    //check if user exist
    const existingUser = await this.userRepository.findOneBy({email: createUserDto.email});
    if(existingUser) throw new BadRequestException(`User with ${createUserDto.email} already exist`)
    // hash user password
  createUserDto.password = await hash(createUserDto.password,10);
  let newUser = this.userRepository.create(createUserDto);

   let savedUser = await this.userRepository.save(newUser)
   return savedUser;
  }

  

  async login(loginUserDto: LoginUserDto) : Promise<UserEntity> {
      //check if user already registered
      const existingUser = await this.userRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email:loginUserDto.email}).getOne();
      if(!existingUser) throw new BadRequestException('Please signup first');
      //check if password is correct
      const correctPassword = await compare(loginUserDto.password, existingUser.password);
     if(!correctPassword) throw new BadRequestException('Password not correct');
     delete existingUser.password;
    return existingUser;
  }


   getAccessToken(loggedInUser:UserEntity): string {
    return sign({id: loggedInUser.id,email:loggedInUser.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRED_TIME});
  }
  

  
}
