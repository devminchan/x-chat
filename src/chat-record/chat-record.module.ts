import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRecord } from './chat-record.entity';
import { RoomJoinInfo } from './room-join-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRecord, RoomJoinInfo])],
})
export class ChatRecordModule {}
