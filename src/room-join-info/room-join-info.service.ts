import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomJoinInfo } from './room-join-info.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Room } from 'src/room/room.entity';

@Injectable()
export class RoomJoinInfoService {
  constructor(
    @InjectRepository(RoomJoinInfo)
    private readonly roomJoinInfoRepository: Repository<RoomJoinInfo>,
  ) {}

  async createRoomJoinInfo(user: User, room: Room): Promise<RoomJoinInfo> {
    const roomJoinInfo = this.roomJoinInfoRepository.create({
      user,
      room,
    });

    return this.roomJoinInfoRepository.save(roomJoinInfo);
  }
}
