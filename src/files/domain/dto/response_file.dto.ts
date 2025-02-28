import { ApiProperty } from '@nestjs/swagger';

export class ResponseFileDto {
  @ApiProperty({
    description: 'The URL of the uploaded file',
    example: 'https://example.com/files/image.jpg',
  })
  fileUrl: string;
}
