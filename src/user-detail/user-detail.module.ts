import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserDetail, UserDetailSchema } from './entities/user-detail.entity';
import { UserDetailRepository } from './repository/user-detail.repository';

@Module({
  controllers: [UserDetailController],
  providers: [UserDetailService, UserDetailRepository],
  imports: [
    MongooseModule.forFeature([
      { name: UserDetail.name, schema: UserDetailSchema },
    ]),
    AuthModule,
  ],
})
export class UserDetailModule {}
