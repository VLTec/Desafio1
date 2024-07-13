// emailService.ts
export interface EmailStructure {
    from: string,
    to: string, 
    subject: string, 
    text: string, 
}

export interface EmailService {
    sendEmail(EmailStructure: EmailStructure): Promise<void>;
  }
  