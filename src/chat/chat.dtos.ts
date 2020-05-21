import { IsNotEmpty } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty()
  roomId: number;
}
