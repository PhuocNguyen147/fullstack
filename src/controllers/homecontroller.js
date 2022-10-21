import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => { // đây là tạo fuction tham số là req và res

    // return res.send("Hello controller");
    try {
        let data = await db.User.findAll();
        console.log("---------------------");
        console.log(data);
        console.log("---------------------");
        return res.render('homepages.ejs', {
            data: JSON.stringify(data) // đổi data thành chuỗi
        });
    } catch (e) {
        console.log(e);
    }

}

let getme = (req, res) => {
    return res.render('test/aboutme.ejs');
}

let getCRUD = (req, res) => {
    return res.render('../views/crud.ejs');
}
//create du liệu trên database
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUers(req.body);
    // console.log();
    console.log(message);
    return res.send('post crud');
}
//hiển thị dư liệu lên màn hình view
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log("---------------------");
    // console.log(data)
    // console.log("---------------------");
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;


    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // kiem tra userdata not found
        // let userData
        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('users not found');
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    console.log(data);
    await CRUDService.updateUserData(data);
    return res.send('data update')
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete success')
    } else {
        return res.send('User not found')
    }
}


module.exports = {
    getHomePage: getHomePage,
    getme: getme,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}