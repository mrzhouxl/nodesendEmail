var nodemailer = require('nodemailer');
module.exports = class Email {
    constructor() {
        this.config = {
            host: process.env.smtp,
            port: 25,
            auth: {
                user: process.env.mailFrom, //刚才注册的邮箱账号
                pass: process.env.mailPwd  //邮箱的授权码，不是注册时的密码
            }
        };
        this.transporter = nodemailer.createTransport(this.config);
    }

    sendEmail(mail) {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mail, function (error, info) {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve(true)
            });
        })
    }
}