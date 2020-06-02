import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/records/:roomId')
  async getChatRecords(@Param('roomId', new ParseIntPipe()) roomId: number) {
    return await this.chatService.getChatRecordsByRoomId(roomId);
  }
}
