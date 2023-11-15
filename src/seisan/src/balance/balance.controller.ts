import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { Balance } from './entities/balance.entity';

@Controller('balances')
@ApiTags('/balances')
@SummarizeApiResponse()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) { }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API' })
  @ApiResponse({
    status: 201,
    description: '指定したIDの貸借情報を返却',
    type: Balance,
  })
  findAll() {
    return this.balanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.update(+id, updateBalanceDto);
  }
}
