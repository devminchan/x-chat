import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PrincipleRequest } from 'src/auth/auth.interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me')
  async updateUser(
    @Req() req: PrincipleRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = req.user;
    return await this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async deleteUser(@Req() req: PrincipleRequest) {
    const result = await this.userService.deleteUser(req.user.id);

    return {
      success: result,
    };
  }
}
