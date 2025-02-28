import { Controller } from '@nestjs/common';
import { NotificationService } from '../../application/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
}
