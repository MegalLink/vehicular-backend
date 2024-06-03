import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SparePartModule } from './spare_part/spare_part.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { EnvValidationSchema } from './config/joi.schema.validation';
import { FilesModule } from './files/files.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { LoggerMiddleware } from './common/domain/repository/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB!, { dbName: 'vehicularDB' }),
    SparePartModule,
    FilesModule,
    BrandModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
