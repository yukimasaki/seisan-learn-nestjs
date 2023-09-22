import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';

@Injectable()
export class BalanceService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createBalanceDto: CreateBalanceDto) {
    return await this.prisma.balance.create({
      data: createBalanceDto
    });
  }

  async findAll() {
    return await this.prisma.balance.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.balance.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return await this.prisma.balance.update({
      where: { id },
      data: updateBalanceDto
    });
  }

  async remove(id: number) {
    return await this.prisma.balance.delete({
      where: { id }
    });
  }
}
