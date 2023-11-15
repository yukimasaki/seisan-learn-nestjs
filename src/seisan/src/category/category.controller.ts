import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('/categories')
@SummarizeApiResponse()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録後のカテゴリー情報を返却',
    type: Category,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query('group') groupId: string,
  ) {
    if (!groupId) throw new BadRequestException;
    return this.categoryService.findAll(+groupId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
