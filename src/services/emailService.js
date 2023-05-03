require('dotenv').config();
import nodemailer from 'nodemailer'
// chức năng gửi mail
let sendSimpleEmail = async (dataSend) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.Email_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Phuoc check API email <b1809281@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh B1809281", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p> Khách hàng nhận được email này vì đã đặt lịch khám bệnh HOSPITAL B1809281 </p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b> Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b> Thời gian: ${dataSend.time}</b></div>
        
        <p>Nếu thông tin này đúng, quý khách hàng vui lòng ấn vào đường link bên dưới để xác nhận thủ tục khám bệnh</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">click here</a>
        </div>

        <div>Cảm ơn quí khách hàng.</div>
        `, // html body
    });
}




// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();




// }
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}