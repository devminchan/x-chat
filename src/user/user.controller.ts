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
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, DeleteUserResponse } from './user.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PrincipleRequest } from 'src/auth/auth.interfaces';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: [User],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @ApiResponse({
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMyInfo(@Req() request: PrincipleRequest): Promise<User> {
    return await this.userService.getUserById(request.user.id);
  }

  @ApiResponse({
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @ApiResponse({
    type: User,
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @ApiResponse({
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/me')
  async updateUser(
    @Req() req: PrincipleRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { id } = req.user;
    return await this.userService.updateUser(id, updateUserDto);
  }

  @ApiResponse({
    type: DeleteUserResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async deleteUser(@Req() req: PrincipleRequest): Promise<DeleteUserResponse> {
    const result = await this.userService.deleteUser(req.user.id);

    return {
      success: result,
    };
  }
}
