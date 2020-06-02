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
import { CreateRoomDto, UpdateRoomDto, DeleteRoomResponse } from './room.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Room } from './room.entity';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiResponse({
    type: [Room],
  })
  @Get()
  async getAllRooms(): Promise<Room[]> {
    return await this.roomService.getAllRooms();
  }

  @ApiResponse({
    type: Room,
  })
  @Get('/:id')
  async getRoomById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Room> {
    return await this.roomService.getRoomById(id);
  }

  @ApiResponse({
    type: Room,
  })
  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return await this.roomService.createRoom(createRoomDto);
  }

  @ApiResponse({
    type: Room,
  })
  @UseGuards(AdminGuard)
  @Put('/:id')
  async updateRoom(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return await this.roomService.updateRoom(id, updateRoomDto);
  }

  @ApiResponse({
    type: DeleteRoomResponse,
  })
  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteRoom(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DeleteRoomResponse> {
    const result = await this.roomService.deleteRoom(id);

    return {
      success: result,
    };
  }
}
