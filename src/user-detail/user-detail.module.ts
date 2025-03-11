import { Module } from '@nestjs/common';
import { UserDetailService } from './application/user-detail.service';
import { UserDetailController } from './infraestructure/controllers/user-detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  UserDetail,
  UserDetailSchema,
} from './domain/entities/user-detail.entity';
import { UserDetailRepository } from './infraestructure/persistence/user-detail.repository';

@Module({
  controllers: [UserDetailController],
  providers: [
    UserDetailService,
    {
      provide: 'IUserDetailRepository',
      useClass: UserDetailRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: UserDetail.name, schema: UserDetailSchema },
    ]),
    AuthModule,
  ],
  exports: [UserDetailService],
})
export class UserDetailModule {}
