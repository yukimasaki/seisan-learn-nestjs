import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { UserResponse } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    return await this.prisma.user.create({
      data: createUserDto
    });
  }

  async findAll(): Promise<UserResponse[] | null> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserResponse | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<UserResponse> {
    return await this.prisma.user.delete({
      where: { id }
    });
  }
}
