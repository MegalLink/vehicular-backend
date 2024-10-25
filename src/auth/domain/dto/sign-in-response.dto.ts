import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['admin', 'user'],
  })
  roles: string[];

  @ApiProperty({
    description: 'The authentication token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '60d0fe4f5311236168a109cd',
  })
  _id: string;
}
