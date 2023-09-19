import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: createTransactionDto
    });
  }

  async findAll() {
    return await this.prisma.transaction.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.transaction.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto
    });
  }

  async remove(id: number) {
    return await this.prisma.transaction.delete({
      where: { id }
    });
  }
}
