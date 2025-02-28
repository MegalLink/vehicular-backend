import { Module } from '@nestjs/common';
import { NotificationService } from './application/notification.service';
import { NotificationController } from './infraestructure/controllers/notification.controller';
import { EmailRepository } from './infraestructure/adapters/email.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [NotificationController],
  imports: [ConfigModule],
  providers: [NotificationService, EmailRepository],
  exports: [EmailRepository],
})
export class NotificationModule {}
