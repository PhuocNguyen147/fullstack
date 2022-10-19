import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);
let createNewUers = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve("Khoi tao User thanh cong");
        } catch (e) {
            reject(e);
        }
    })


}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { //resolve giải quyết được vấn đề, reject từ chối
        try {
            let hashPassword = await bcrypt.hashSync("password", salt);
            resolve(hashPassword);// khi sử dụng promise. resolve tương tự như return 
        } catch (e) {
            reject(e);
        }

    })
}
module.exports = {
    createNewUers: createNewUers
}