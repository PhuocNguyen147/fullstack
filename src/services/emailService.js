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
        html:


            getBodyHTMLEmail(dataSend),

    });
}




let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
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
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Dear,${dataSend.patientName}!</h3>
            <p>
            The customer received this email because he booked an appointment for HOSPITAL B1809281 </p>
            <p>Information to schedule an appointment:</p>
            <div><b> Doctor: ${dataSend.doctorName}</b></div>
            <div><b> Time: ${dataSend.time}</b></div>

            <p>If this information is correct, please click on the link below to confirm the medical examination procedure</p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">click here</a>
            </div>

            <div>Thank you customers.</div>
            `
    }
    return result;
}


let sendAttachment = async (dataSend) => {
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
        to: dataSend.email, // list of receivers
        subject: "Trả kết quả khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `ketqua-${dataSend.patientName}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ],
    });
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào, ${dataSend.patientName} !</h3>
        <p> Khách hàng nhận được email này vì đã đặt lịch khám bệnh HOSPITAL B1809281 </p>
        <p>Thông tin kết quả và đơn thuốc trong file đính kèm:</p>
       

        <div>Cảm ơn quí khách hàng.</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Dear,!</h3>
            <p>
            The customer received this email because he booked an appointment for HOSPITAL B1809281 </p>
            <p>Information to schedule an appointment:</p>
            

            <div>Thank you customers.</div>
            `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    getBodyHTMLEmail: getBodyHTMLEmail,
    getBodyHTMLEmailRemedy: getBodyHTMLEmailRemedy,
    sendAttachment: sendAttachment

}