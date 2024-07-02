import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export abstract class BaseRepository<T extends Document, R> {
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
    throw new BadRequestException('A ocurrido un error inesperado');
  }

  async findAll(query: object = {}): Promise<R[]> {
    try {
      const entities = await this._model.find(query).exec();
      return entities.map((entity) => this.transform(entity));
    } catch (error) {
      this._handleException(error);
    }
    throw new BadRequestException('A ocurrido un error inesperado');
  }

  async findOne(searchParam: object): Promise<R> {
    try {
      const entity = await this._model.findOne(searchParam).exec();
      if (!entity) {
        throw new NotFoundException(
          `${this.entityName} con id ${searchParam} no encontrado`,
        );
      }
      return this.transform(entity);
    } catch (error) {
      this._handleNotfound(undefined, searchParam);
    }
    throw new NotFoundException(
      `${this.entityName} con id ${searchParam} no encontrado`,
    );
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
    throw new NotFoundException(
      `${this.entityName} con id ${searchParam} no encontrado`,
    );
  }

  async remove(searchParam: string): Promise<R> {
    try {
      const entity = await this._model.findByIdAndDelete(searchParam).exec();
      this._handleNotfound(entity, searchParam);
      return this.transform(entity!);
    } catch (error) {
      this._handleException(error);
    }
    throw new NotFoundException(
      `${this.entityName} con id ${searchParam} no encontrado`,
    );
  }

  private _handleException(error: any) {
    if (error instanceof NotFoundException)
      throw new NotFoundException(error.message);

    if (error.code === 11000) {
      throw new BadRequestException(
        `${this.entityName} ya existe en la base de datos ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.error('Error:', error);
    throw new BadRequestException('A ocurrido un error inesperado');
  }

  private _handleNotfound(
    entity: T | undefined | null,
    searchParam?: string | object,
  ) {
    if (!entity) {
      const message = searchParam
        ? `${this.entityName} con ${JSON.stringify(searchParam)} no encontrado`
        : `No se puedo crear ${this.entityName}`;
      throw new NotFoundException(message);
    }
  }
}
