import { reject, resolve } from "bluebird"
import db from "../models/index"
require('dotenv').config();
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';


let buildUrlEmail = (doctorId, token) => {



    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

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
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                // Thông tin của bác sĩ và giờ khám đế gửi cho bệnh nhân 
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)

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
                            timeType: data.timeType,
                            token: token
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

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'loi postVerifyBookAppointment/ Missing required parameter '
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false // trả về object là của sequilize
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'tai nguoi dung thanh cong / update aappointment success! '
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'tai nguoi dung khong thanh cong / Appointment has been created!'
                    })
                }


            }
        } catch (e) {
            reject(e)
        }

    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    buildUrlEmail: buildUrlEmail,
    postVerifyBookAppointment: postVerifyBookAppointment
}