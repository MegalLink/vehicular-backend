import { ApiProperty } from '@nestjs/swagger';

export class ResponseSparePartDto {
  @ApiProperty({ description: 'Unique identifier of the spare part' })
  _id: string;

  @ApiProperty({ description: 'Code of the spare part' })
  code: string;

  @ApiProperty({ description: 'Name of the spare part' })
  name: string;

  @ApiProperty({ description: 'Description of the spare part' })
  description: string;

  @ApiProperty({ description: 'Price of the spare part' })
  price: number;

  @ApiProperty({ description: 'Array of image URLs for the spare part' })
  images: string[];

  @ApiProperty({ description: 'Category to which the spare part belongs' })
  category: string;

  @ApiProperty({ description: 'Number of spare parts available in stock' })
  stock: number;

  @ApiProperty({ description: 'Brand of the spare part' })
  brand: string;

  @ApiProperty({
    description: 'Specific brand model associated with the spare part',
  })
  brandModel: string;

  @ApiProperty({ description: 'Model type of the spare part' })
  modelType: string;

  @ApiProperty({ description: 'Year associated with the model type' })
  modelTypeYear: string;

  @ApiProperty({ description: 'Date when the spare part record was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the spare part record was last updated',
  })
  updatedAt: Date;
}
