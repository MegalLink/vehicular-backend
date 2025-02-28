import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    description: 'Response message after user sign up',
    example: 'User successfully signed up',
  })
  message: string;
}
