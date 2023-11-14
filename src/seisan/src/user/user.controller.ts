import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録したユーザー情報を返却',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みユーザー情報を全数返却',
    type: User,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('email/:email')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API (メールアドレス)' })
  @ApiResponse({
    status: 200,
    description: '指定したメールアドレスに紐づくユーザー情報を返却',
    type: User,
  })
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('id/:id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API (ID)' })
  @ApiResponse({
    status: 200,
    description: '指定したIDに紐づくユーザー情報を返却',
    type: User,
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体更新API' })
  @ApiResponse({
    status: 200,
    description: '更新後のユーザー情報を返却',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
