import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatRecord } from './chat-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRecord)
    private readonly chatRecordRepository: Repository<ChatRecord>,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  async generateChatRecord(params: {
    userId: number;
    roomId: number;
    message: string;
  }): Promise<ChatRecord> {
    const user = await this.userService.getUserById(params.userId);
    const room = await this.roomService.getRoomById(params.roomId);

    const chatRecord = this.chatRecordRepository.create({
      user,
      room,
      content: params.message,
    });

    return await this.chatRecordRepository.save(chatRecord);
  }

  async getChatRecordsByRoomId(roomId: number): Promise<ChatRecord[]> {
    const results = await this.chatRecordRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.room', 'room')
      .where('room.id = :roomId', { roomId })
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    return results;
  }
}
