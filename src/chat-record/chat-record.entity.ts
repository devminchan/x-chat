import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
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
  room: Room;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @CreateDateColumn()
  createDate: Date;
}
