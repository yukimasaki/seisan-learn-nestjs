import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionComplex } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import * as dayjs from 'dayjs';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  createWithTransaction(
    @Body() createTransactionComplex: CreateTransactionComplex,
  ) {
    return this.transactionService.createWithTransaction(createTransactionComplex);
  }

  // @Get()
  // findAll() {
  //   return this.transactionService.findAll();
  // }

  @Get()
  findByPaymentDate(
    @Query('start') start: string = dayjs().startOf('month').format('YYYY-MM-DD'),
    @Query('end') end: string = dayjs().endOf('month').format('YYYY-MM-DD'),
  ) {
    return this.transactionService.findByPaymentDate(
      start,
      end,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
