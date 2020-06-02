import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/records/:roomId')
  async getChatRecords(@Param('roomId', new ParseIntPipe()) roomId: number) {
    return await this.chatService.getChatRecordsByRoomId(roomId);
  }
}
