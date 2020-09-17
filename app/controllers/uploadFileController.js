var exports = module.exports = {}
const csv = require('csv-parser');
let path = require('path');
const fs = require('fs');
const iconv = require("iconv-lite");
let Sequelize = require("sequelize");
let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let csvSeparator = ';';
let results = [];

let createTable = (csvArr) => {
    if (csvArr) {
        let keys = Object.keys(csvArr[0]);
        let emptyModel = {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            }
        };
        keys.forEach((item) => {
            emptyModel[item] = {
                type: Sequelize.STRING,
            }
        })
        let tableName = 'Employe';
        let model = sequelize.define(tableName, emptyModel, {
            indexes: [{
                unique: true,
                fields: keys.slice(1, 4) ///частный случай для этой таблицы
            }]
        });
        model.sequelize.sync().then(function () {
            console.log(`Table create succesfully`)
        }).then(function () {
            csvArr.forEach(function (item) {
                Object.keys(item).forEach(function (key) {
                    if (item[key] === '') {
                        item[key] = null;
                    }
                })
                model.create(item).catch(err => console.log(err))
            })
        }).catch(function (err) {
            console.log(err, "Something went wrong with the table")
        });
    }
}

exports.index = function (req, res) {
    if(req && req.file && req.file.path)
    {
        fs.createReadStream(req.file.path)
            .pipe(iconv.decodeStream("win1251"))
            .pipe(csv({
                separator: csvSeparator
            }))
            .on('data', (data) => {
                results.push(data)
            })
            .on('end', () => {
                createTable(results);
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
                res.render('resultofupload',{result:'CSV upload succesfully.'})
            });
    }
    else
        res.render('uploadpage');
}