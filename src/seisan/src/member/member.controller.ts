import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':userId/:groupId')
  findOne(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.memberService.findOne(
      Number(userId),
      Number(groupId),
    );
  }

  @Patch(':userId/:groupId')
  update(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(
      Number(userId),
      Number(groupId),
      updateMemberDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
