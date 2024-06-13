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
    throw new BadRequestException('An unexpected error occurred');
  }

  async findAll(query: object = {}): Promise<R[]> {
    try {
      const entities = await this._model.find(query).exec();
      return entities.map((entity) => this.transform(entity));
    } catch (error) {
      this._handleException(error);
    }
    throw new BadRequestException('An unexpected error occurred');
  }

  async findOne(searchParam: object): Promise<R> {
    try {
      const entity = await this._model.findOne(searchParam).exec();
      if (!entity) {
        throw new NotFoundException(
          `${this.entityName} with id ${searchParam} not found`,
        );
      }
      return this.transform(entity);
    } catch (error) {
      this._handleNotfound(undefined, searchParam);
    }
    throw new NotFoundException(
      `${this.entityName} with id ${searchParam} not found`,
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
      `${this.entityName} with id ${searchParam} not found`,
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
      `${this.entityName} with id ${searchParam} not found`,
    );
  }

  private _handleException(error: any) {
    if (error instanceof NotFoundException)
      throw new NotFoundException(error.message);

    if (error.code === 11000) {
      throw new BadRequestException(
        `${this.entityName} already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.error('Error:', error);
    throw new BadRequestException('An unexpected error occurred');
  }

  private _handleNotfound(
    entity: T | undefined | null,
    searchParam?: string | object,
  ) {
    if (!entity) {
      const message = searchParam
        ? `${this.entityName} with ${JSON.stringify(searchParam)} not found`
        : `Could not create ${this.entityName}`;
      throw new NotFoundException(message);
    }
  }
}
