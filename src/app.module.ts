import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SparePartModule } from './spare_part/spare_part.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-vehicular'), //TODO:change with env vars
    SparePartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
