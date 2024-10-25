import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponseDto {
  @ApiProperty({
    description: 'Response message after changing password',
    example: 'Password successfully changed',
  })
  message: string;
}
