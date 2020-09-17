/*

создать функцию которая создает таблицу в бд на основе загруженной табиц сверяя поля.если они совпадают грузить в старую бд-таблицу, если разные то создать новую
 */
module.exports = function(sequelize, Sequelize) {

    var Worker = sequelize.define('Employe', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        import_id:{
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        patronymycname: {
            type: Sequelize.TEXT
        },
        section: {
            type: Sequelize.TEXT
        },
        position: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        mobilephone:
            {
                type: Sequelize.TEXT
            },
        addictionalphone:
            {
                type: Sequelize.TEXT
            },
        internalphone:
            {
                type: Sequelize.TEXT
            },
        homephone:
            {
                type: Sequelize.TEXT
            },
        login:
            {
                type: Sequelize.TEXT,
                notEmpty: true
            },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
    });

    return Worker;

}