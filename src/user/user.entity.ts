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

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
