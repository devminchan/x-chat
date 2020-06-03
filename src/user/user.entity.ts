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
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiResponseProperty()
  @Column({ unique: true, nullable: false })
  loginUserId: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @ApiResponseProperty()
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

  @ApiResponseProperty()
  @Column({ default: false, nullable: false })
  isAdmin: boolean;

  @ApiResponseProperty()
  @CreateDateColumn()
  createDate: Date;

  @ApiResponseProperty()
  @UpdateDateColumn()
  updateDate: Date;
}
