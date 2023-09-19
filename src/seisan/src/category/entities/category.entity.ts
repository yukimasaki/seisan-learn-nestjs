import { IsInt, IsPositive, IsString } from "class-validator";

export class Category {
  @IsInt()
  @IsPositive()
  id!: number;

  @IsString()
  icon!: string;

  @IsString()
  category!: string;

  @IsInt()
  @IsPositive()
  groupId!: number;
}

export class CategoryResponse extends Category {}
