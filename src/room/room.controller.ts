import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './room.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms() {
    return await this.roomService.getAllRooms();
  }

  @Get('/:id')
  async getRoomById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.roomService.getRoomById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  async updateRoom(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomService.updateRoom(id, updateRoomDto);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteRoom(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.roomService.deleteRoom(id);

    return {
      success: result,
    };
  }
}
