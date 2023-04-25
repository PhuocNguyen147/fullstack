import doctorService from "../services/doctorService"

//ham load động bác sĩ, thêm bác sĩ vào frontend
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'loi server...'
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors()
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi sever from getAllDoctor'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor
}