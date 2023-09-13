import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MemberResponse } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createMemberDto: CreateMemberDto): Promise<MemberResponse> {
    return await this.prisma.member.create({
      data: createMemberDto
    });
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
