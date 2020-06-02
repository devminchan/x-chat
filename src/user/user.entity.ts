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
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  loginUserId: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 24, nullable: false })
  username: string;

  @OneToMany(
    () => ChatRecord,
    chatRecord => chatRecord.user,
  )
  chatRecords: ChatRecord[];

  @OneToMany(
    () => RoomJoinInfo,
    roomJoinInfo => roomJoinInfo.user,
  )
  roomJoinInfoList: RoomJoinInfo[];

  @Column({ default: false, nullable: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
