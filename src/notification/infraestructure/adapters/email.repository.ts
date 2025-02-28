import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from '../../../config/env.config';
import { IEmailRepository } from '../../domain/repository/email.repository.interface';
import { EmailRepositoryData } from 'src/notification/domain/interfaces/email-data.interface';

@Injectable()
export class EmailRepository implements IEmailRepository {
  constructor(private readonly _configService: ConfigService) {}

  async sendEmail(emailData: EmailRepositoryData): Promise<void> {
    try {
      const options = {
        host: this._configService.get(EnvironmentConstants.email_host),
        port: this._configService.get(EnvironmentConstants.email_port),
        auth: {
          user: this._configService.get(EnvironmentConstants.email_user),
          pass: this._configService.get(EnvironmentConstants.email_pass),
        },
      };

      const transporter = nodemailer.createTransport(options);

      await transporter.sendMail({
        from: this._configService.get(EnvironmentConstants.email_from),
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.body,
      });
    } catch (error) {
      throw new InternalServerErrorException('Mail sent failed');
    }
  }
}
