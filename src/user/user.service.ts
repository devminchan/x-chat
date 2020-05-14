import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...createUserDto,
    });

    return this.userRepository.save(createdUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const targetUser = await this.userRepository.findOneOrFail({ id });

    if (updateUserDto.password) targetUser.password = updateUserDto.password;
    if (updateUserDto.username) targetUser.username = updateUserDto.username;

    return this.userRepository.save(targetUser);
  }

  async deleteUser(id: number) {
    const results = await this.userRepository.delete(id);

    if (results.affected > 0) {
      return true;
    } else {
      return false;
    }
  }
}
