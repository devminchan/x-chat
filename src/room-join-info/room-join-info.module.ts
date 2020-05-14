import { Module } from '@nestjs/common';
import { RoomJoinInfoService } from './room-join-info.service';

@Module({
  providers: [RoomJoinInfoService]
})
export class RoomJoinInfoModule {}
