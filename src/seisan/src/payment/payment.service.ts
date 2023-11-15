import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll() {
    return await this.prisma.payment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.payment.findUnique({
      where: { id }
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto
    });
  }

  async remove(id: number) {
    return await this.prisma.payment.delete({
      where: { id }
    });
  }
}
