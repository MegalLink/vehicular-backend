import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';

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
    return this._pokemonModel.find().exec();
  }

  async findOne(searchParam: string) {
    try {
      const product = await this._pokemonModel.findById(searchParam);
      if (!product) {
        throw new NotFoundException(`Product with id ${searchParam} not found`);
      }

      return product;
    } catch (error) {
      throw new NotFoundException(`Product with id ${searchParam} not found`);
    }
  }

  async update(searchParam: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this._pokemonModel.findByIdAndUpdate(
        searchParam,
        updateProductDto,
        { new: true },
      );
      if (!product) {
        throw new NotFoundException(`Product with id ${searchParam} not found`);
      }
      return product;
    } catch (error) {
      this._handleException(error);
    }
  }

  async remove(searchParam: string) {
    const search_key = { _id: searchParam };

    try {
      const deleted_item =
        await this._pokemonModel.findByIdAndDelete(search_key);

      if (!deleted_item) {
        throw new NotFoundException(`Product with id ${searchParam} not found`);
      }

      return deleted_item;
    } catch (error) {
      this._handleException(error);
    }
  }

  private _handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.error('Error create:', error);
    throw error;
  }
}
