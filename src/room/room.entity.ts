import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ChatRecord } from 'src/chat/chat-record.entity';
import { RoomJoinInfo } from 'src/room-join-info/room-join-info.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class Room {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiResponseProperty()
  @Column({ nullable: false })
  roomTitle: string;

  @ApiResponseProperty()
  @Column({ nullable: false })
  roomSubtitle: string;

  @OneToMany(
    () => ChatRecord,
    chatRecord => chatRecord.room,
  )
  chatRecords: ChatRecord[];

  @OneToMany(
    () => RoomJoinInfo,
    roomJoinInfo => roomJoinInfo.room,
  )
  roomJoinInfoList: RoomJoinInfo[];

  @ApiResponseProperty()
  @CreateDateColumn()
  createDate: Date;

  @ApiResponseProperty()
  @UpdateDateColumn()
  updateDate: Date;
}
