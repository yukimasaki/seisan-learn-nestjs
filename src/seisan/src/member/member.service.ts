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

  async findAll(): Promise<MemberResponse[] | null> {
    return await this.prisma.member.findMany();
  }

  async findOne(userId: number, groupId: number) {
    return await this.prisma.member.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        }
      }
    });
  }

  async update(userId: number, groupId: number, updateMemberDto: UpdateMemberDto) {
    return await this.prisma.member.update({
      where: {
        userId_groupId: {
          userId,
          groupId,
        }
      },
      data: updateMemberDto
    });
  }

  async remove(userId: number, groupId: number) {
    return await this.prisma.member.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        }
      }
    });
  }
}
