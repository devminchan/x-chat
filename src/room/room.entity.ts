import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ChatRecord } from 'src/chat-record/chat-record.entity';
import { RoomJoinInfo } from 'src/chat-record/room-join-info.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  roomTitle: string;

  @Column({ nullable: false })
  roomSubTitle: string;

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
