import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JoinRoomDto } from './chat.dtos';
import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`received message: ${data}`);
    socket.broadcast.emit('message', data);
    socket.emit('message', data);
  }

  @UseGuards(WsJwtGuard)
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('room:join')
  joinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`received message: `, joinRoomDto);
    socket.join(`r${joinRoomDto.roomId}`);
    this.server.to(`r${joinRoomDto.roomId}`).emit('user:joined', socket.id);
  }
}
