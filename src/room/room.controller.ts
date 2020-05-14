import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './room.dtos';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms() {
    return await this.roomService.getAllRooms();
  }

  @Get('/:id')
  async getRoomById(@Param('id') id: number) {
    return await this.roomService.getRoomById(id);
  }

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @Put('/:id')
  async updateRoom(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomService.updateRoom(id, updateRoomDto);
  }
}
