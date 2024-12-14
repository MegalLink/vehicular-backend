import { ApiProperty } from '@nestjs/swagger';
import { ResponseSparePartDto } from './response_spare_part.dto';

export class GetAllResponseSparePartDto {
  @ApiProperty({
    description: 'Total number of spare parts',
    example: 1302,
  })
  count: number;

  @ApiProperty({
    description: 'URL for the next page',
    example: 'localhost:3000/api/v1/spare-part?offset=20&limit=20',
    nullable: true,
  })
  next: string | null;

  @ApiProperty({
    description: 'URL for the previous page',
    example: 'localhost:3000/api/v1/spare-part?offset=0&limit=20',
    nullable: true,
  })
  previous: string | null;

  @ApiProperty({
    description: 'Array of spare parts for the current page',
    type: [ResponseSparePartDto],
  })
  results: ResponseSparePartDto[];
}
