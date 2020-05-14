import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    const result = await this.userService.deleteUser(id);

    return {
      success: result,
    };
  }

  @Patch('/:id/join/:roomId')
  async joinRoom(@Param('id') userId: number, @Param('roomId') roomId: number) {
    return this.userService.joinRoom(userId, roomId);
  }
}
