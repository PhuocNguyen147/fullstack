//es6
import express from "express";
import bodyParser from "body-parser"; // lấy được tham sô mà phía client gửi cho chúng ta
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require('dotenv').config(); // gọi đến hàm config của dotenv để chạy lệnh process.env 
// let dotenv
let app = express();
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs DONE!!!" + port)

})