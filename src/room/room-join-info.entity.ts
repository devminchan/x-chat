import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Room } from './room.entity';

@Entity()
export class RoomJoinInfo {
  @PrimaryColumn()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  @ManyToOne(() => Room)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @CreateDateColumn()
  userJoinedDate: Date;
}
