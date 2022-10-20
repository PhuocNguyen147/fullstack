import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
// creat database tu ban phim
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

let hashUserPassword = (password) => { // sử dụng mảng băm bcrypt để mã hóa password
    return new Promise(async (resolve, reject) => { //resolve giải quyết được vấn đề, reject từ chối
        try {
            let hashPassword = await bcrypt.hashSync("password", salt);
            resolve(hashPassword);// khi sử dụng promise. resolve tương tự như return 
        } catch (e) {
            reject(e);
        }

    })
}

//lay data tu database ve va hien thi len man hinhf
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { // xử lý bất đồng bộ với hàm promise
        try {
            let user = db.User.findAll({
                raw: true // loai bo du lieu thua
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })

            if (user) {
                resolve(user)
            } else {
                resolve({})
            }

        } catch (e) {
            reject(e);
        }

    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve();
            } else {

            }

        } catch (e) {
            console.log(e);
        }
    })
}

module.exports = {
    createNewUers: createNewUers,// create len database
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
}