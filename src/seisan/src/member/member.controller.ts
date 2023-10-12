import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  findByGroupId(
    @Query('groupId')  groupId: string,
  ) {
    return this.memberService.findByGroupId(
      +groupId,
    );
  }

  @Get(':userId/:groupId')
  findOne(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.memberService.findOne(
      +userId,
      +groupId,
    );
  }

  @Patch(':userId/:groupId')
  update(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(
      +userId,
      +groupId,
      updateMemberDto,
    );
  }

  @Delete(':userId/:groupId')
  remove(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.memberService.remove(
      +userId,
      +groupId,
    );
  }
}
