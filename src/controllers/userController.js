import userService from "../services/userService" //ton thoi gian tra du lieu
let handleLogin = async (req, res) => {
    let email = req.body.email; //lấy giá trị từ phía client truyền lên(express)
    let password = req.body.password;
    //check email cua nguoi dung
    //compare userInfor
    //jwt: json web token
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            arrMassage: 'Loi dang nhap sai mat khau or nguoi dung'
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    console.log(userData)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Khong co tai khoan',
            users: []
        })
    } else {
        let users = await userService.getAllUsers(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Success',
            users
        })
    }

}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);

}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Lỗi chưa truyền ID muốn xóa"
        })

    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);

}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllcodeService(req.query.type);

        return res.status(200).json(data);
    } catch (e) {
        console.log('Lỗi code type: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi lấy loại người dùng từ server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,

}  