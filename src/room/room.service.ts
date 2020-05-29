import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from './room.dtos';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({});
  }

  async getRoomById(id: number): Promise<Room> {
    const room = this.roomRepository.findOne({ id });

    if (!room) {
      throw new NotFoundException('room not found.');
    }

    return room;
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = this.roomRepository.create({
      ...createRoomDto,
    });

    return this.roomRepository.save(createdRoom);
  }

  async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const targetRoom = await this.roomRepository.findOneOrFail({ id });

    if (updateRoomDto.roomTitle) targetRoom.roomTitle = updateRoomDto.roomTitle;
    if (updateRoomDto.roomSubtitle)
      targetRoom.roomSubtitle = updateRoomDto.roomSubtitle;

    return this.roomRepository.save(targetRoom);
  }

  async deleteRoom(id: number) {
    const results = await this.roomRepository.delete(id);

    if (results.affected > 0) {
      return true;
    } else {
      return false;
    }
  }
}
