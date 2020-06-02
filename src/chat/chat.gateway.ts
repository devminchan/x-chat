import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JoinRoomDto } from './chat.dtos';
import {
  UsePipes,
  ValidationPipe,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';
import { PrincipleSocket } from 'src/auth/auth.interfaces';
import { ChatService } from './chat.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: PrincipleSocket,
  ) {
    console.log(`received message: ${data}`);

    const currentRoomId = Object.keys(socket.rooms)[0];

    // roomId가 없거나, room으로 시작하지 읺는 경우 예외 발생
    if (!currentRoomId) {
      throw new BadRequestException('socket roomId is missing');
    }

    if (!currentRoomId.startsWith('room')) {
      throw new BadRequestException('socket roomId is missing');
    }

    let roomId: number;

    try {
      // roomId를 못 읽어올 시 예외 발생
      roomId = Number.parseInt(currentRoomId.split(' ')[1]);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    const result = await this.chatService.generateChatRecord({
      userId: socket.user.id,
      roomId: roomId,
      message: data,
    });

    this.server.to(`room ${roomId}`).emit('message', result.content);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('room:join')
  joinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() socket: PrincipleSocket,
  ) {
    // 다른 방 접속 시 기존 채팅방 socket 통신 끊기
    socket.leaveAll();
    socket.join(`room ${joinRoomDto.roomId}`);
    this.server
      .to(`room ${joinRoomDto.roomId}`)
      .emit('user:joined', socket.user.id);
  }
}
