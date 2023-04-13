module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('your table name ', 'name', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};

//bảng conver ảnh theo chuẩn base64     