import { ApiProperty } from '@nestjs/swagger';

export class ErrorNotFoundDto {
  @ApiProperty({
    description: 'The error message describing the issue.',
    example: 'Item not found',
  })
  message: string;

  @ApiProperty({
    description: 'The type or name of the error.',
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    description: 'The HTTP status code associated with the error.',
    example: 404,
  })
  statusCode: number;
}

export class ErrorBadRequestDto {
  @ApiProperty({
    description: 'The error message describing the issue.',
    examples: ['Item already exist in DB', 'Property "name" is required'],
  })
  message: string;

  @ApiProperty({
    description: 'The type or name of the error.',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'The HTTP status code associated with the error.',
    example: 400,
  })
  statusCode: number;
}
