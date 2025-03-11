import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '60d0fe4f5311236168a109cd',
  })
  _id: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'username123',
  })
  userName: string;

  @ApiProperty({
    description: 'Indicates if the user is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['admin', 'user'],
  })
  roles: string[];
}
