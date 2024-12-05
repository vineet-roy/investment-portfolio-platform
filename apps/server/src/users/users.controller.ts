import { Controller, Post, Body, Get, Param, UseGuards, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a new user
  @Post('signup')
  @Version('1')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  // Endpoint to get user by ID (protected route)
  @Get(':id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
