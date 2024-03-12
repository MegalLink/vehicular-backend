import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, MongooseError, isValidObjectId } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { json } from 'stream/consumers';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly _pokemonModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this._pokemonModel.create(createProductDto);

      return product;
    } catch (error) {
      this._handleException(error);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(searchParam: string) {
    let product: Product | null;

    const searchKey = this._getSearchKeyFindOne(searchParam);

    product = await this._pokemonModel.findOne(searchKey);

    if (!product)
      throw new NotFoundException(
        `Product with name or id ${searchParam} not found`,
      );

    return product;
  }

  private _getSearchKeyFindOne(searchParam: string): object {
    //TODO trim and to lowercase if needed
    if (isValidObjectId(searchParam)) {
      return { _id: searchParam };
    }

    return { name: searchParam };
  }

  async update(searchParam: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(searchParam);

    try {
      await product.updateOne(updateProductDto, {
        new: true,
      });
    } catch (error) {
      this._handleException(error);
    }

    return { ...product, ...updateProductDto };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private _handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.error('Error create:', error);
    throw new InternalServerErrorException(
      `Cant create product - Check server logs`,
    );
  }
}
