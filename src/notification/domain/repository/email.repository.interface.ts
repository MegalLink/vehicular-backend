import { EmailRepositoryData } from './email.repository';

export interface IEmailRepository {
  sendEmail(emailData: EmailRepositoryData): Promise<void>;
}
