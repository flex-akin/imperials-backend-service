import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EnquiryData, MortgageApplication, Options } from '../interfaces/optionsInterface'
import * as fs from 'fs'
import * as path from 'path'
import hbs from 'handlebars'

export class MailService {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    async create_transport() {
        const sesConfig: SMTPTransport.Options = {
            port: process.env.MAIL_PORT as unknown as number,
            host: process.env.MAIL_HOST,
            secure: true,
            auth: {
                user: process.env.AWS_SES_ACCESS_KEY_ID,
                pass: process.env.AWS_SES_SECRET_ACCESS_KEY
            },
        

        };
         this.transporter = nodemailer.createTransport(sesConfig);
    
        return this.transporter;
    }
    
    //SEND MAIL
    async sendEnquiryMail(data : EnquiryData, options: Options) 
    {
        const source = fs.readFileSync(path.join(__dirname, '../../templates/enquiry.hbs'), "utf8")
        const template = hbs.compile(source)
        return await this.transporter
            .sendMail({ 
                from: `info@imperialmortgagebank.com`,
                to: `property@imperialmortgagebank.com`,
                subject: options.subject,
                html: template(data)
            })
          
     
    }

    async sendApplicationMail(data : MortgageApplication, options: Options) 
    {
        const source = fs.readFileSync(path.join(__dirname, '../../templates/application.hbs'), "utf8")
        const template = hbs.compile(source)
        return await this.transporter
            .sendMail({ 
                from: `info@imperialmortgagebank.com`,
                to: `property@imperialmortgagebank.com`,
                subject: options.subject,
                html: template(data)
            })
          
     
    }


}