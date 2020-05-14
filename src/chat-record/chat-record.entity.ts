import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Room } from 'src/room/room.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class ChatRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(
    () => Room,
    room => room.chatRecords,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @CreateDateColumn()
  createDate: Date;
}
