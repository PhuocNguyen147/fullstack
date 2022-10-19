import db from '../models/index';

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

let postCRUD = (req, res) => {
    console.log(req.body);
    return res.send('alo');
}


module.exports = {
    getHomePage: getHomePage,
    getme: getme,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}