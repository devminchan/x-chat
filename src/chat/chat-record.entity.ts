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
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class ChatRecord {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiResponseProperty()
  @Column()
  content: string;

  @ManyToOne(
    () => Room,
    room => room.chatRecords,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ApiResponseProperty({ type: () => User })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ApiResponseProperty()
  @CreateDateColumn()
  createDate: Date;
}
