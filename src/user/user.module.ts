import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoomModule } from 'src/room/room.module';
import { RoomJoinInfoModule } from 'src/room-join-info/room-join-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoomModule, RoomJoinInfoModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
