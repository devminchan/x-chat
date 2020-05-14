import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ChatRecord } from 'src/chat-record/chat-record.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'room_title', nullable: false })
  roomTitle: string;

  @Column({ name: 'room_subtitle', nullable: false })
  roomSubTitle: string;

  @OneToMany(
    () => ChatRecord,
    chatRecord => chatRecord.room,
  )
  chatRecords: ChatRecord[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
