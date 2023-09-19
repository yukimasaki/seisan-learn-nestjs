import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: { id }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
