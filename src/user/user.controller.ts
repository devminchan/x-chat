import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAllUsers() {
    return 'all users';
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return id;
  }
}
