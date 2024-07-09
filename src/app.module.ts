import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { OrderModule } from './order/order.module';

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
    AuthModule,
    NotificationModule,
    UserDetailModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'auth', method: RequestMethod.ALL }, // Excluye todas las rutas bajo 'auth'
        { path: 'auth/(.*)', method: RequestMethod.ALL }, // Excluye todas las subrutas de 'auth'
      )
      .forRoutes('*');
  }
}
