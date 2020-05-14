import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Room } from '../room/room.entity';

@Entity()
export class RoomJoinInfo {
  @ManyToOne(
    () => User,
    user => user.roomJoinInfoList,
    { primary: true },
  )
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(
    () => Room,
    room => room.roomJoinInfoList,
    { primary: true },
  )
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @CreateDateColumn()
  userJoinedDate: Date;
}
