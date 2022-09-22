import express from "express"; //khai bao thu vien express


let configViewEngine = (app) => {
    app.use(express.static("./src/public")); //anh tren server chi lay o thu muc public, phia client sẽ lấy file nào
    app.set("view engine", "ejs");// cho phép gõ logic trong html if else for,...
    app.set("views", "./src/views"); // viết file phía clien trong thu mục view, file ejs, 
}

module.exports = configViewEngine; //xuất module ViewEngine ở ngoài 