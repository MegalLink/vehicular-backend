import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {
  @ApiProperty({
    description: 'Indicates if the user is active',
    example: true,
    required: false,
  })
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
    required: false,
  })
  @IsOptional()
  rol: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  email: string;
}
