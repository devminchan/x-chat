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

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  roomTitle: string;

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

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
