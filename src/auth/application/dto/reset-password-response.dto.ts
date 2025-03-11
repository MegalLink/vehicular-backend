import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponseDto {
  @ApiProperty({
    description: 'Response message after reset',
    example: 'A mail has been sent to your email address',
  })
  message: string;
}
