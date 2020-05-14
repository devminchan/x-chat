import { Module } from '@nestjs/common';
import { RoomJoinInfoService } from './room-join-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomJoinInfo } from './room-join-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomJoinInfo])],
  providers: [RoomJoinInfoService],
  exports: [RoomJoinInfoService],
})
export class RoomJoinInfoModule {}
