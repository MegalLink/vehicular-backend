import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBaseRepository } from './mongo-base-respository.interface';

@Injectable()
export abstract class BaseRepository<T extends Document, R>
  implements IBaseRepository<T, R>
{
  constructor(
    @InjectModel('MODEL_NAME')
    private readonly _model: Model<T>,
    private readonly entityName: string,
  ) {}

  abstract transform(entity: T): R;

  async create(createDto: any): Promise<R> {
    try {
      const entity = await this._model.create(createDto);
      return this.transform(entity);
    } catch (error) {
      this._handleException(error);
    }
    throw new InternalServerErrorException('A ocurrido un error inesperado');
  }

  async findAll(query: object = {}, offset: number = 0, limit: number = 0): Promise<R[]> {
    try {
      let queryBuilder = this._model.find(query).skip(offset);
      
      if (limit !== 0) {
        queryBuilder = queryBuilder.limit(limit);
      }

      const entities = await queryBuilder.exec();
      return entities.map((entity) => this.transform(entity));
    } catch (error) {
      this._handleException(error);
    }
    throw new InternalServerErrorException('A ocurrido un error inesperado');
  }

  async count(query: object = {}): Promise<number> {
    try {
      return await this._model.countDocuments(query).exec();
    } catch (error) {
      this._handleException(error);
    }
    throw new InternalServerErrorException('A ocurrido un error inesperado');
  }

  async findOne(searchParam: object): Promise<R | undefined> {
    const entity = await this._model.findOne(searchParam).exec();
    if (!entity) {
      return undefined;
    }

    return this.transform(entity);
  }

  async update(searchParam: string, updateDto: any): Promise<R> {
    try {
      const entity = await this._model
        .findByIdAndUpdate(searchParam, updateDto, { new: true })
        .exec();

      this._handleNotfound(entity, searchParam);
      return this.transform(entity!);
    } catch (error) {
      this._handleException(error);
    }
    throw new InternalServerErrorException('A ocurrido un error inesperado');
  }

  async remove(searchParam: string): Promise<R> {
    try {
      const entity = await this._model.findByIdAndDelete(searchParam).exec();
      this._handleNotfound(entity, searchParam);
      return this.transform(entity!);
    } catch (error) {
      console.log('Remove error', error);
      this._handleException(error);
    }
    throw new InternalServerErrorException('A ocurrido un error inesperado');
  }

  private _handleException(error: any) {
    if (error.code === 11000) {
      const keyValue = error.keyValue;
      if (Object.keys(keyValue).length > 1) {
        // Si hay múltiples campos en el error de duplicado
        throw new BadRequestException(
          `La combinación de campos ${Object.keys(keyValue).join(', ')} ya existe en ${this.entityName}`,
        );
      } else {
        // Si solo hay un campo duplicado
        throw new BadRequestException(
          `El campo ${Object.keys(keyValue)[0]} ya existe en ${this.entityName}`,
        );
      }
    }

    throw error;
  }

  private _handleNotfound(
    entity: T | undefined | null,
    searchParam?: string | object,
  ) {
    if (!entity) {
      searchParam =
        typeof searchParam === 'object'
          ? JSON.stringify(searchParam)
          : JSON.stringify({ _id: searchParam });
      const message = searchParam
        ? `${this.entityName} con ${searchParam} no encontrado`
        : `No se puedo crear ${this.entityName}`;

      throw new NotFoundException(message);
    }
  }
}
