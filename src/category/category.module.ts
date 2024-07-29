import { Module } from '@nestjs/common';
import { CategoryService } from './application/category.service';
import { CategoryController } from './infraestructure/category.controller';
import { CategoryRepository } from './domain/repository/category.repository';
import { Category, CategorySchema } from './domain/entities/category.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoryController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
