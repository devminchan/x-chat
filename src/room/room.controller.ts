import { Controller, Get, Param } from '@nestjs/common';

@Controller('rooms')
export class RoomController {
  @Get()
  getAllRooms() {
    return 'all rooms';
  }

  @Get('/:id')
  getRoomById(@Param('id') id: number) {
    return id;
  }
}
