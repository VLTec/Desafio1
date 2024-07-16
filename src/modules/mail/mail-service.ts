export type SendMailProps = {
    subject: string;
    content: string;
    to: string;
}

export abstract class MailService {
    abstract sendMail (props: SendMailProps): Promise<any>;
}