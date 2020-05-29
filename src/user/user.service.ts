import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dtos';
import { RoomService } from 'src/room/room.service';
import { RoomJoinInfoService } from 'src/room-join-info/room-join-info.service';
import { RoomJoinInfo } from 'src/room-join-info/room-join-info.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roomService: RoomService,
    private readonly roomJoinInfoService: RoomJoinInfoService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async getUserById(id: number): Promise<User> {
    const user = this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async getUserByLoginUserId(loginUserId: string): Promise<User> | null {
    return this.userRepository.findOne({ loginUserId }) ?? null;
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

  async joinRoom(userId: number, roomId: number): Promise<RoomJoinInfo> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const room = await this.roomService.getRoomById(roomId);

    return this.roomJoinInfoService.createRoomJoinInfo(user, room);
  }
}
