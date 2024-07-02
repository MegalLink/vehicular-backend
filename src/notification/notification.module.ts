import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EmailRepository } from './domain/repository/email.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [NotificationController],
  imports: [ConfigModule],
  providers: [NotificationService, EmailRepository],
  exports: [EmailRepository],
})
export class NotificationModule {}
