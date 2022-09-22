let getHomePage = (req, res) => { // đây là tạo fuction tham số là req và res
    // return res.send("Hello controller");
    return res.render('homepages.ejs');
}

let getme = (req, res) => {
    return res.render('test/aboutme.ejs');
}


module.exports = {
    getHomePage: getHomePage,
    getme: getme,
}