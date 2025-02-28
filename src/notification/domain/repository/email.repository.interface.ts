import { EmailRepositoryData } from '../interfaces/email-data.interface';

export interface IEmailRepository {
  sendEmail(emailData: EmailRepositoryData): Promise<void>;
}
