import { IsOptional } from 'class-validator';

export class QueryUserDto {
  @IsOptional()
  isActive: boolean;
  @IsOptional()
  rol: string;
  @IsOptional()
  email: string;
}
