import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {

    private async transporter () {
        const testAccount = await nodemailer.createTestAccount()
        // console.log(testAccount)
        const transport = nodemailer.createTransport({
            host: "localhost",
            port: 1025,
            ignoreTLS: true, //a voir false en prod
            // auth a mettre dans .env
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            }
        })
        // console.log(transport)
        return transport
    }

    async sendSignupConfirmation(userEmail: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to: userEmail,
            subject: "Inscription platform FORTIL ANNONCE",
            html: `<h3>Confirmation d'inscription</h3>`
        })
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to: userEmail,
            subject: "Reset password",
            html: `
            <a href="${url}">Reset password</a>
            <p>Secret code : <strong>${code}</strong></p>
            <p>Ce code est valable 15 minutes</p>
            `
        })
    }

    async sendEmailAnnonce(userEmailSender:string, userEmailTarget: string, message: string, title: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to: userEmailTarget,
            subject: `Message concernant votre annonce Fortil "${title}" de la part de ${userEmailSender}`,
            html: `<p> ${message} </p>`
        })
    }

}
