// file này giúp đường link website chạy vào file này đầu tiên
import express from "express";
import homeController from "../controllers/homecontroller";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"
let router = express.Router();

let initWebRoutes = (app) => {  // truyền ứng dụng "app" vào
    router.get('/', homeController.getHomePage); // "/" là đường link trên localhost
    router.get('/about', homeController.getme);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/getAllUsers', userController.handleGetAllUsers);

    router.post('/api/createNewUser', userController.handleCreateNewUser);
    router.put('/api/editUser', userController.handleEditUser);
    router.delete('/api/deleteUser', userController.handleDeleteUser);

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/getalldoctor', doctorController.getAllDoctor);

    router.get('/phuoc', (req, res) => { // "/" là đường link trên localhost
        return res.send('đây là đường link dẫn đến nhà Phước')
    });
    return app.use("/", router); // sử dụng các file router mà chúng ta khai báo. dùng viết API
}

module.exports = initWebRoutes //sử dụng file nay ở bên ngoài web.js  