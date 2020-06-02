import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatRecord } from './chat-record.entity';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiResponse({
    type: [ChatRecord],
  })
  @Get('/records/:roomId')
  async getChatRecords(
    @Param('roomId', new ParseIntPipe()) roomId: number,
  ): Promise<ChatRecord[]> {
    return await this.chatService.getChatRecordsByRoomId(roomId);
  }
}
