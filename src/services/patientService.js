import { reject, resolve } from "bluebird"
import db from "../models/index"

import emailService from './emailService'

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'loi postBookAppointment/ Missing required parameter '
                })
            }
            else {

                // Thông tin của bác sĩ và giờ khám đế gửi cho bệnh nhân 
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'https://www.youtube.com/watch?v=ADkVOsJwAAU'

                }) // gửi nội dung đặt lịch cho email của bệnh nhân

                // update tạo thêm email cho bệnh nhân đăng ký khám bệnh
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },

                });
                //create them lich booking cho benh nhan
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }


                resolve({
                    errCode: 0,

                    errMessage: 'postBookAppointment success!'
                })
            }
        } catch (e) {
            reject(e)
        }

    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}