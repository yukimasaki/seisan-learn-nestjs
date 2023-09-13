import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GroupResponse } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createGroupDto: CreateGroupDto): Promise<GroupResponse> {
    return await this.prisma.group.create({
      data: createGroupDto
    });
  }

  async findAll(): Promise<GroupResponse[] | null> {
    return await this.prisma.group.findMany();
  }

  async findOne(id: number): Promise<GroupResponse | null> {
    return await this.prisma.group.findUnique({
      where: { id }
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
