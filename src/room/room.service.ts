import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({});
  }

  async getRoomById(id: number): Promise<Room> {
    return this.roomRepository.findOneOrFail({ id });
  }
}
