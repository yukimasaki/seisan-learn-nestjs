import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsPositive, IsString, MaxLength } from "class-validator";

export class User {
  @ApiProperty({
    example: '1',
    description: 'ユーザーID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'john@example.com',
    description: 'メールアドレス',
  })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'Jhon Doe',
    description: '',
  })
  @IsString()
  @MaxLength(255)
  displayName: string;

  @ApiProperty({
    example: 'free',
    description: '',
    enum: ['free', 'premium'],
  })
  @IsString()
  membership: string;

  @ApiProperty({
    example: '$2a$12$jA9fyFy1qfh379BEfaJM2uGPe9EnqrEZnREv1iaiX8nyCmQz69ERK',
    description: 'ハッシュ化されたパスワード',
  })
  @IsString()
  hashedPassword: string;
}

export class UserResponse extends User { }

export class UserOmitPassword extends OmitType(User, ['hashedPassword']) { }
