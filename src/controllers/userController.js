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
            massage: 'Loi dang nhap sai mat khau or nguoi dung'
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

module.exports = {
    handleLogin: handleLogin,

}  