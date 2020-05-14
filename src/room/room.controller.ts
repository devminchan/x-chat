import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Get('/:id')
  async getRoomById(@Param('id') id: number) {
    return this.roomService.getRoomById(id);
  }
}
